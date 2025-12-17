import React from "react";

export default function Footer() {
  return (
    <>
      <section className="bg-gray-100 mt-20 dark:bg-gray-800">
        <div className="grid grid-cols-5 container mx-auto py-10">
          <h1 className="font-bold col-span-2">PrimPick</h1>

          <div>
            <h2 className="font-bold mb-3">Company</h2>
            <ul className="space-y-1">
              <li>About company</li>
              <li>Our team</li>
              <li>Careers</li>
              <li>Contact us</li>
              <li>News</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold mb-3" >Account</h2>
            <ul className="space-y-1">
              <li>Your account</li>
              <li>Shipping rates & policies</li>
              <li>Refunds & replacements</li>
              <li>Delivery info</li>
              <li>Order tracking</li>
              <li>Taxes & fees</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold mb-3">Customer service</h2>
            <ul className="space-y-1">
              <li>Payment methods</li>
              <li>Money back guarantee</li>
              <li>Product returns</li>
              <li>Support center</li>
              <li>Shipping</li>
              <li>Term and conditions</li>
            </ul>
          </div>



        </div>
      </section>
    </>
  );
}
