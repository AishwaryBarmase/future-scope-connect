
import { useState } from "react";
import { supabase } from "../integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Settings = () => {
  const { user, loading, profile } = useAuth();
  const [updating, setUpdating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const passwordForm = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

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

  const isOAuthUser = user.app_metadata.provider && user.app_metadata.provider !== 'email';

  async function updatePassword(data: { password: string; confirmPassword: string }) {
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords match.",
        variant: "destructive",
      });
      return;
    }

    try {
      setUpdating(true);
      
      const { error } = await supabase.auth.updateUser({ 
        password: data.password 
      });
      
      if (error) {
        throw error;
      }

      toast({
        title: "Success!",
        description: "Your password has been updated successfully.",
      });

      passwordForm.reset();
    } catch (error: any) {
      toast({
        title: "Error updating password",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  }

  async function deleteAccount() {
    try {
      // First delete the profile
      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", user.id);

      if (profileError) {
        throw profileError;
      }

      // Then sign out
      await supabase.auth.signOut();

      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted.",
      });

      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error deleting account",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>

          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Account Information</h2>
              <p className="text-gray-600">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-gray-600">
                <strong>Account Type:</strong> {isOAuthUser ? 'Google Account' : 'Email & Password'}
              </p>
            </div>

            {!isOAuthUser && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Update Password</h2>
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(updatePassword)} className="space-y-4">
                    <FormField
                      control={passwordForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" disabled={updating}>
                      {updating ? "Updating..." : "Update Password"}
                    </Button>
                  </form>
                </Form>
              </div>
            )}

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-red-600 mb-4">Danger Zone</h2>
              <p className="text-gray-600 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteAccount} className="bg-red-600 hover:bg-red-700">
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
