import { Clock, MapPin, Utensils } from "lucide-react";

export default function FooterInfoStrip() {
  return (
    <div className="bg-[#F5D000] text-black">
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">

        {/* Opening Hours */}
        <div className="flex items-center justify-center md:justify-start gap-4">
          <Clock />
          <div>
            <p className="font-semibold">Opening Hours</p>
            <p className="text-sm">Mon – Sun: 12 PM – 11 PM</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center justify-center md:justify-start gap-4">
          <MapPin />
          <div>
            <p className="font-semibold">Location</p>
            <p className="text-sm">123 Culinary Ave, London</p>
          </div>
        </div>

        {/* Services */}
        <div className="flex items-center justify-center md:justify-start gap-4">
          <Utensils />
          <div>
            <p className="font-semibold">Services</p>
            <p className="text-sm">Dine-in, Takeaway & Delivery</p>
          </div>
        </div>

      </div>
    </div>
  );
}
