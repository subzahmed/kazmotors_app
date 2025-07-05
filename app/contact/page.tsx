import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Send, User } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="bg-hom-dark text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Contact <span className="text-hom-red">Us</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get in touch with our team. We're here to help you find your perfect vehicle and answer any questions you
            may have.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-hom-gray border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-white">
                      First Name
                    </Label>
                    <Input id="firstName" className="bg-hom-dark border-hom-dark text-white" placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white">
                      Last Name
                    </Label>
                    <Input id="lastName" className="bg-hom-dark border-hom-dark text-white" placeholder="Smith" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="bg-hom-dark border-hom-dark text-white"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    className="bg-hom-dark border-hom-dark text-white"
                    placeholder="(123) 456-7890"
                  />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-white">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    className="bg-hom-dark border-hom-dark text-white"
                    placeholder="Vehicle Inquiry"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-white">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    rows={5}
                    className="bg-hom-dark border-hom-dark text-white"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                <Button className="w-full bg-hom-red hover:bg-red-700 text-white">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="bg-hom-gray border-0">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-hom-red h-12 w-12 rounded-full flex items-center justify-center mr-4">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">CEO</h3>
                      <p className="text-gray-300">
                        Ali Raza
                        <br />
                        Chief Executive Officer
                        <br />
                        Leading KazMotors with vision and excellence
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-hom-gray border-0">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-hom-red h-12 w-12 rounded-full flex items-center justify-center mr-4">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Visit Our Showroom</h3>
                      <p className="text-gray-300">
                        123 Showroom Street
                        <br />
                        Cityville, State 12345
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-hom-gray border-0">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-hom-red h-12 w-12 rounded-full flex items-center justify-center mr-4">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Call Us</h3>
                      <p className="text-gray-300">
                        Sales: (123) 456-7890
                        <br />
                        Service: (123) 456-7891
                        <br />
                        Parts: (123) 456-7892
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-hom-gray border-0">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-hom-red h-12 w-12 rounded-full flex items-center justify-center mr-4">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Email Us</h3>
                      <p className="text-gray-300">
                        General: info@kazmotors.com
                        <br />
                        Sales: sales@kazmotors.com
                        <br />
                        Service: service@kazmotors.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-hom-gray border-0">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-hom-red h-12 w-12 rounded-full flex items-center justify-center mr-4">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Business Hours</h3>
                      <p className="text-gray-300">
                        Monday - Friday: 9:00 AM - 7:00 PM
                        <br />
                        Saturday: 10:00 AM - 5:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-hom-dark py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Find Us</h2>
            <p className="text-gray-300">
              Located in the heart of Cityville, easily accessible from all major highways.
            </p>
          </div>
          <div className="bg-hom-gray rounded-lg p-8 text-center">
            <div className="h-64 bg-hom-dark rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Interactive Map Coming Soon</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
