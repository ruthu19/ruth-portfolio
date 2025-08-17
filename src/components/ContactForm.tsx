
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }).max(500, {
    message: "Message must not be longer than 500 characters.",
  }),
});

const ContactForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Message sent successfully!", {
      description: "Thanks for reaching out. I will get back to you shortly.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="relative bg-black py-20 overflow-hidden">
      {/* Animated Blurred Glow Background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-[780px] h-[320px] md:w-[880px] md:h-[400px] bg-gradient-to-r from-[#f1e98b22] via-[#ffe97833] to-[#f6e5741e] rounded-full blur-3xl opacity-35 animate-fade-glow"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-anton text-5xl md:text-6xl mb-4 motion-showcase-pop">
            Get In <span className="text-brand-yellow">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-brand-yellow mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Left Side - Contact Info */}
          <div className="space-y-12">
            {/* Let's Connect Section */}
            <div>
              <h3 className="text-2xl font-bold text-brand-yellow mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8">
                I'm always interested in hearing about new opportunities and exciting projects. Whether you have a question or just want to say hi, I'll do my best to get back to you!
              </p>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-brand-yellow/20 rounded-lg">
                    <Mail className="w-6 h-6 text-brand-yellow" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email</h4>
                    <p className="text-muted-foreground">alex.morgan@example.com</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-brand-yellow/20 rounded-lg">
                    <Phone className="w-6 h-6 text-brand-yellow" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Phone</h4>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-brand-yellow/20 rounded-lg">
                    <MapPin className="w-6 h-6 text-brand-yellow" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Location</h4>
                    <p className="text-muted-foreground">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Follow Me Section */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Follow Me</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="p-3 bg-brand-yellow/20 rounded-lg hover:bg-brand-yellow/30 transition-colors"
                >
                  <Github className="w-6 h-6 text-brand-yellow" />
                </a>
                <a
                  href="#"
                  className="p-3 bg-brand-yellow/20 rounded-lg hover:bg-brand-yellow/30 transition-colors"
                >
                  <Linkedin className="w-6 h-6 text-brand-yellow" />
                </a>
                <a
                  href="#"
                  className="p-3 bg-brand-yellow/20 rounded-lg hover:bg-brand-yellow/30 transition-colors"
                >
                  <Twitter className="w-6 h-6 text-brand-yellow" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold text-brand-yellow mb-6">Send Message</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">First Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John" 
                            {...field} 
                            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Last Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Doe" 
                            {...field} 
                            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="john.doe@example.com" 
                          {...field} 
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Subject */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Subject</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Project Inquiry" 
                          {...field} 
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project..."
                          className="resize-none bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-dark font-semibold py-3"
                >
                  Send Message
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
