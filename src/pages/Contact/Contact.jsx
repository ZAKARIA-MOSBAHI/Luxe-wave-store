import { Button } from "../../admin/components/ui/Button";
import { Input } from "../../admin/components/ui/Input";
import { Textarea } from "../../admin/components/ui/Textarea";
import { Separator } from "../../admin/components/ui/Separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../admin/components/ui/Tabs";
import {
  Clock,
  Globe,
  Instagram,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Facebook,
  Twitter,
} from "lucide-react";
import NewsLetter from "../../components/NewsLetter";

const Contact = () => {
  return (
    <div className="container max-w-5xl py-12 md:py-20">
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            Contact Us
          </h1>
          <p className="text-zinc-600 text-lg md:text-xl max-w-3xl mx-auto">
            We'd love to hear from you. Reach out with any questions about our
            collections, sustainability practices, or retail opportunities.
          </p>
          <div className="flex justify-center">
            <Separator className="w-24 bg-zinc-900 h-[2px]" />
          </div>
        </section>

        {/* Contact Methods Tabs */}
        <section className="py-8">
          <Tabs defaultValue="message" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="message">Send Message</TabsTrigger>
              <TabsTrigger value="visit">Visit Us</TabsTrigger>
              <TabsTrigger value="call">Call/Email</TabsTrigger>
            </TabsList>

            <TabsContent value="message">
              <div className="border rounded-md p-8 mt-6">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Send a Message</h2>
                  <p className="text-zinc-600">
                    Fill out the form below and our team will get back to you
                    within 24-48 hours.
                  </p>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-2"
                        >
                          Full Name
                        </label>
                        <Input id="name" placeholder="Your name" />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-2"
                        >
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium mb-2"
                      >
                        Subject
                      </label>
                      <Input id="subject" placeholder="How can we help?" />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        Message
                      </label>
                      <Textarea
                        id="message"
                        rows={6}
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="privacy"
                          className="mt-1 mr-2"
                        />
                        <label
                          htmlFor="privacy"
                          className="text-sm text-zinc-600"
                        >
                          I agree to the privacy policy and consent to LuxeWave
                          processing my data to respond to my inquiry.
                        </label>
                      </div>
                    </div>

                    <Button className="w-full md:w-auto" type="submit">
                      Send Message
                    </Button>

                    <p className="text-xs text-zinc-600 text-center md:text-left">
                      We typically respond within 24-48 business hours
                    </p>
                  </form>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="visit">
              <div className="border rounded-md p-8 mt-6">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Visit Our Stores</h2>
                  <p className="text-zinc-600">
                    Experience LuxeWave collections in person at one of our
                    retail locations.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">
                        New York Flagship
                      </h3>
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-zinc-900 mt-0.5" />
                        <div>
                          <p>123 Fashion Avenue</p>
                          <p>New York, NY 10001</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-zinc-900" />
                        <p>+1 (212) 555-1234</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-zinc-900" />
                        <div>
                          <p>Mon-Sat: 10am - 7pm</p>
                          <p>Sunday: 11am - 5pm</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">
                        Los Angeles Studio
                      </h3>
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-zinc-900 mt-0.5" />
                        <div>
                          <p>456 Design Boulevard</p>
                          <p>Los Angeles, CA 90001</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-zinc-900" />
                        <p>+1 (323) 555-5678</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-zinc-900" />
                        <div>
                          <p>Tues-Sat: 11am - 6pm</p>
                          <p>Sun-Mon: Closed</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-100 animate-pulse h-80 rounded-md mt-6">
                    {/* Map placeholder */}
                    <div className="h-full flex items-center justify-center">
                      <p className="text-zinc-600">Interactive store map</p>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-600">
                    To schedule a personal styling appointment, please call the
                    store directly or fill out our appointment form.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="call">
              <div className="border rounded-md p-8 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Contact Information</h2>
                    <p className="text-zinc-600">
                      Reach out to our team via phone, email, or social media.
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-zinc-900/10 rounded-full w-12 h-12 flex items-center justify-center mt-1">
                          <Mail className="w-6 h-6 text-zinc-900" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">Email Us</h3>
                          <p className="text-zinc-600">info@luxewave.com</p>
                          <p className="text-zinc-600">support@luxewave.com</p>
                          <p className="text-zinc-600">press@luxewave.com</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="bg-zinc-900/10 rounded-full w-12 h-12 flex items-center justify-center mt-1">
                          <Phone className="w-6 h-6 text-zinc-900" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">Call Us</h3>
                          <p className="text-zinc-600">
                            Customer Care: +1 (555) 123-4567
                          </p>
                          <p className="text-zinc-600">
                            Wholesale Inquiries: +1 (555) 987-6543
                          </p>
                          <p className="text-zinc-600 text-sm mt-1">
                            Hours: Mon-Fri, 9am-5pm EST
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="bg-zinc-900/10 rounded-full w-12 h-12 flex items-center justify-center mt-1">
                          <Globe className="w-6 h-6 text-zinc-900" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">International</h3>
                          <p className="text-zinc-600">
                            European Support: +44 (0) 20 1234 5678
                          </p>
                          <p className="text-zinc-600">
                            Asia-Pacific: +61 2 9876 5432
                          </p>
                          <p className="text-zinc-600 text-sm mt-1">
                            International shipping available to 65+ countries
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Connect With Us</h2>
                    <p className="text-zinc-600">
                      Follow us on social media for the latest collections,
                      behind-the-scenes content, and sustainability initiatives.
                    </p>

                    <div className="space-y-6 mt-8">
                      <div className="flex items-center space-x-4 border-b pb-4">
                        <Instagram className="h-6 w-6" />
                        <div>
                          <h3 className="font-medium">Instagram</h3>
                          <a
                            href="/#"
                            className="text-zinc-600 hover:text-zinc-900"
                          >
                            @luxewave_official
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 border-b pb-4">
                        <Facebook className="h-6 w-6" />
                        <div>
                          <h3 className="font-medium">Facebook</h3>
                          <a
                            href="/#"
                            className="text-zinc-600 hover:text-zinc-900"
                          >
                            LuxeWave Fashion
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 border-b pb-4">
                        <Twitter className="h-6 w-6" />
                        <div>
                          <h3 className="font-medium">Twitter</h3>
                          <a
                            href="/#"
                            className="text-zinc-600 hover:text-zinc-900"
                          >
                            @LuxeWave
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-medium mb-2">Press Inquiries</h3>
                      <p className="text-zinc-600">
                        For press and media inquiries, please contact our PR
                        team at press@luxewave.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* FAQ Section */}
        <section className="py-12">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-block px-4 py-1 bg-zinc-100 text-sm font-medium rounded-full">
              Support
            </div>
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
              Find quick answers to common questions about our products and
              services.
            </p>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="border p-6 rounded-md">
              <h3 className="font-medium text-lg">
                What are your shipping options?
              </h3>
              <p className="text-zinc-600 mt-2">
                We offer standard shipping (5-7 business days), express shipping
                (2-3 business days), and next-day delivery options. Free
                standard shipping on all orders over $100. International
                shipping is available to most countries with delivery typically
                taking 7-14 business days depending on the destination.
              </p>
            </div>

            <div className="border p-6 rounded-md">
              <h3 className="font-medium text-lg">
                What is your return policy?
              </h3>
              <p className="text-zinc-600 mt-2">
                We accept returns within 30 days of purchase. Items must be
                unworn with original tags attached. Return shipping is free for
                domestic orders. Once received, refunds are processed within 5-7
                business days. For international returns, please contact our
                customer service team for specific instructions.
              </p>
            </div>

            <div className="border p-6 rounded-md">
              <h3 className="font-medium text-lg">
                Do you offer size exchanges?
              </h3>
              <p className="text-zinc-600 mt-2">
                Yes, we offer free size exchanges on all full-priced items.
                Simply log into your account, select the order, and request an
                exchange. We'll send the new size as soon as your return is
                processed, or immediately if the item is in stock.
              </p>
            </div>

            <div className="border p-6 rounded-md">
              <h3 className="font-medium text-lg">How can I track my order?</h3>
              <p className="text-zinc-600 mt-2">
                You'll receive a tracking number via email once your order
                ships. You can also check order status in your account
                dashboard. If you have any concerns about your shipment, please
                contact our customer service team with your order number.
              </p>
            </div>

            <div className="border p-6 rounded-md">
              <h3 className="font-medium text-lg">
                Do you offer sustainable packaging?
              </h3>
              <p className="text-zinc-600 mt-2">
                Yes, all LuxeWave products are shipped in recyclable or
                biodegradable packaging. We use minimal plastic and have
                eliminated single-use materials from our supply chain. Our
                shipping boxes are made from recycled cardboard and can be
                reused or recycled.
              </p>
            </div>

            <div className="border p-6 rounded-md">
              <h3 className="font-medium text-lg">
                How do I care for my LuxeWave garments?
              </h3>
              <p className="text-zinc-600 mt-2">
                Each item comes with specific care instructions on the tag.
                Generally, we recommend gentle washing with mild detergent,
                hanging to dry, and storing folded rather than on hangers for
                knits. For detailed care guides, visit our Garment Care page or
                contact customer service.
              </p>
            </div>
          </div>
        </section>

        {/* Customer Service Promise */}
        <section className="py-12">
          <div className="bg-zinc-100 p-12 rounded-md text-center space-y-6">
            <h2 className="text-3xl font-bold">Our Customer Service Promise</h2>
            <p className="text-zinc-600 text-lg max-w-3xl mx-auto">
              At LuxeWave, we're committed to providing exceptional service at
              every step of your journey with us. Our dedicated team is here to
              assist with any questions, concerns, or feedback you may have
              about our products or services.
            </p>
            <div className="pt-4">
              <Button variant="sharp">Read Our Service Standards</Button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <NewsLetter />
      </div>
    </div>
  );
};

export default Contact;
