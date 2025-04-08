
import { useState, useEffect } from "react";
import { supabase } from "../integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EditProfile = () => {
  const { user, profile, loading, refreshProfile } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      dob: new Date(),
      address: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        fullName: profile.full_name || "",
        email: user?.email || "",
        dob: profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(),
        address: profile.address || "",
      });
      setAvatarUrl(profile.avatar_url);
      setResumeUrl(profile.resume_url);
    }
  }, [profile, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("profiles")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from("profiles").getPublicUrl(filePath);
      
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: data.publicUrl })
        .eq("id", user.id);

      if (updateError) {
        throw updateError;
      }

      setAvatarUrl(data.publicUrl);
      await refreshProfile();
      
      toast({
        title: "Success!",
        description: "Avatar updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error uploading avatar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }

  async function uploadResume(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select a file to upload.");
      }

      const file = event.target.files[0];
      setResumeFile(file);

      // Display the selected file name
      const fileNameParts = file.name.split(".");
      const fileExt = fileNameParts.pop();
      const fileName = fileNameParts.join(".");
      
      toast({
        title: "File selected",
        description: `${fileName}.${fileExt} (will be uploaded on save)`,
      });

    } catch (error: any) {
      toast({
        title: "Error selecting file",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  async function handleSubmit(data: any) {
    try {
      setUploading(true);
      let updatedResumeUrl = resumeUrl;

      // Upload resume if a new file was selected
      if (resumeFile) {
        const fileExt = resumeFile.name.split(".").pop();
        const filePath = `${user.id}/resume.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("profiles")
          .upload(filePath, resumeFile, { upsert: true });

        if (uploadError) {
          throw uploadError;
        }

        const { data: fileData } = supabase.storage.from("profiles").getPublicUrl(filePath);
        updatedResumeUrl = fileData.publicUrl;
      }

      // Update profile
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: data.fullName,
          date_of_birth: data.dob ? format(data.dob, "yyyy-MM-dd") : null,
          address: data.address,
          resume_url: updatedResumeUrl,
        })
        .eq("id", user.id);

      if (error) {
        throw error;
      }

      await refreshProfile();

      toast({
        title: "Success!",
        description: "Profile updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <div className="flex flex-col items-center mb-8">
              <Avatar className="h-32 w-32">
                <AvatarImage src={avatarUrl || undefined} />
                <AvatarFallback className="text-2xl">
                  {profile?.full_name
                    ? profile.full_name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()
                        .substring(0, 2)
                    : user?.email?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              
              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Profile Photo
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={uploadAvatar}
                  disabled={uploading}
                  id="avatar"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                />
                <p className="mt-1 text-xs text-gray-500">
                  JPG, PNG or GIF (max. 5MB)
                </p>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} disabled />
                      </FormControl>
                      <p className="text-sm text-muted-foreground">
                        Email address cannot be changed.
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your address" className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Resume / CV
                  </label>
                  {resumeUrl && (
                    <div className="flex items-center gap-2 mb-2">
                      <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Current Resume
                      </a>
                    </div>
                  )}
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={uploadResume}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    PDF, DOC, or DOCX (max. 10MB)
                  </p>
                </div>
                
                <Button type="submit" className="w-full" disabled={uploading}>
                  {uploading ? "Updating..." : "Save Changes"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditProfile;
