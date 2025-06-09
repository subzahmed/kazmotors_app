import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Car, Users, Award, Shield, Clock, MapPin, Phone, ChevronRight, Target, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative bg-hom-dark text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-hom-red">KazMotors</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              For over two decades, we've been dedicated to connecting customers with their perfect vehicles. Our
              commitment to excellence and customer satisfaction has made us a trusted name in the automotive industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/inventory">
                <Button className="bg-hom-red hover:bg-red-700 text-white">
                  Browse Our Inventory
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="bg-black py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Our <span className="text-hom-red">Story</span>
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded in 2001, KazMotors began as a small family-owned dealership with a simple mission: to provide
                  quality vehicles and exceptional customer service to our community.
                </p>
                <p>
                  Over the years, we've grown from a modest showroom to one of the region's most trusted automotive
                  retailers, but our core values remain unchanged. We believe that buying a car should be an exciting
                  and stress-free experience.
                </p>
                <p>
                  Today, we're proud to offer an extensive selection of premium vehicles, backed by our commitment to
                  transparency, integrity, and customer satisfaction.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.jpeg?height=400&width=600"
                alt="KazMotors Showroom"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-hom-dark py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Our Mission & <span className="text-hom-red">Values</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We're driven by a set of core values that guide everything we do, from selecting our inventory to serving
              our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-hom-gray border-0 text-center p-6">
              <CardContent className="pt-6">
                <div className="bg-hom-red h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Our Mission</h3>
                <p className="text-gray-300">
                  To provide exceptional automotive solutions that exceed customer expectations while building lasting
                  relationships based on trust and reliability.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-hom-gray border-0 text-center p-6">
              <CardContent className="pt-6">
                <div className="bg-hom-red h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Integrity</h3>
                <p className="text-gray-300">
                  We believe in complete transparency and honesty in all our dealings. Every vehicle comes with a
                  detailed history and our guarantee of quality.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-hom-gray border-0 text-center p-6">
              <CardContent className="pt-6">
                <div className="bg-hom-red h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Customer First</h3>
                <p className="text-gray-300">
                  Your satisfaction is our priority. We go above and beyond to ensure you find the perfect vehicle that
                  meets your needs and budget.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-black py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Meet Our <span className="text-hom-red">Team</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our experienced team of automotive professionals is here to help you find your perfect vehicle and provide
              ongoing support throughout your ownership experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-hom-gray border-0 text-center">
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <Image
                    src="/placeholder.jpeg?height=200&width=200"
                    alt="John Smith"
                    width={200}
                    height={200}
                    className="rounded-full mx-auto"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">John Smith</h3>
                <p className="text-hom-red font-medium mb-2">General Manager</p>
                <p className="text-gray-300 text-sm">
                  With over 15 years in the automotive industry, John leads our team with passion and expertise.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-hom-gray border-0 text-center">
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <Image
                    src="/placeholder.jpeg?height=200&width=200"
                    alt="Sarah Johnson"
                    width={200}
                    height={200}
                    className="rounded-full mx-auto"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Sarah Johnson</h3>
                <p className="text-hom-red font-medium mb-2">Sales Director</p>
                <p className="text-gray-300 text-sm">
                  Sarah's dedication to customer service has earned her recognition as our top sales professional.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-hom-gray border-0 text-center">
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <Image
                    src="/placeholder.jpeg?height=200&width=200"
                    alt="Mike Davis"
                    width={200}
                    height={200}
                    className="rounded-full mx-auto"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Mike Davis</h3>
                <p className="text-hom-red font-medium mb-2">Finance Manager</p>
                <p className="text-gray-300 text-sm">
                  Mike helps customers secure the best financing options to make their dream car affordable.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-hom-dark py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Why Choose <span className="text-hom-red">KazMotors</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We're more than just a car dealership. We're your partners in finding the perfect vehicle and ensuring
              your complete satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-hom-red h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Premium Selection</h3>
              <p className="text-gray-300 text-sm">
                Carefully curated inventory of quality vehicles from trusted brands.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-hom-red h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Quality Guarantee</h3>
              <p className="text-gray-300 text-sm">
                Every vehicle undergoes thorough inspection and comes with our quality guarantee.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-hom-red h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Expert Team</h3>
              <p className="text-gray-300 text-sm">
                Knowledgeable professionals dedicated to helping you make the right choice.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-hom-red h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Award Winning</h3>
              <p className="text-gray-300 text-sm">
                Recognized for excellence in customer service and automotive retail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-black py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-hom-red mb-2">20+</div>
              <div className="text-white font-medium">Years of Experience</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-hom-red mb-2">5000+</div>
              <div className="text-white font-medium">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-hom-red mb-2">500+</div>
              <div className="text-white font-medium">Vehicles in Stock</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-hom-red mb-2">98%</div>
              <div className="text-white font-medium">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-hom-red py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Experience the KazMotors Difference?
          </h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Visit our showroom today or contact our team to learn more about our vehicles and services. We're here to
            help you find your perfect drive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inventory">
              <Button size="lg" className="bg-white text-hom-red hover:bg-gray-100">
                Browse Inventory
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-hom-red">
                Contact Us Today
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="flex items-center justify-center">
              <MapPin className="h-6 w-6 mr-3" />
              <div>
                <div className="font-semibold">Visit Our Showroom</div>
                <div className="text-sm opacity-90">123 Showroom Street, Cityville</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Phone className="h-6 w-6 mr-3" />
              <div>
                <div className="font-semibold">Call Us Today</div>
                <div className="text-sm opacity-90">(123) 456-7890</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Clock className="h-6 w-6 mr-3" />
              <div>
                <div className="font-semibold">Business Hours</div>
                <div className="text-sm opacity-90">Mon-Fri 9am-7pm, Sat 10am-5pm</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
