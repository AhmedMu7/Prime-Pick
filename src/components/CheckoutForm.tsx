"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";

export function CheckoutForm({ cartId }: { cartId: string | undefined }) {
  const detailsInput = useRef<HTMLInputElement | null>(null);
  const cityInput = useRef<HTMLInputElement | null>(null);
  const phoneInput = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  function validateInputs(): boolean {
    const details = detailsInput.current?.value?.trim();
    const city = cityInput.current?.value?.trim();
    const phone = phoneInput.current?.value?.trim();

    if (!details || !city || !phone) {
      setError("Please fill in all shipping fields");
      return false;
    }
    setError(null);
    return true;
  }

  async function Checkoutsession() {
    if (!validateInputs()) return;

    const shippingAddress = {
      details: detailsInput.current?.value,
      city: cityInput.current?.value,
      phone: phoneInput.current?.value,
    };

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        method: "POST",

        body: JSON.stringify({ shippingAddress }),

        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmFiMTJiODRkOTUwYzkwMjM3OGNkZCIsIm5hbWUiOiJhaG1lZEFsaSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY0ODY2MjE5LCJleHAiOjE3NzI2NDIyMTl9.3j3cFKg_g39-EjW_bfclqV0tH6RwYnv2IlemlPj8C1k",
          "Content-Type" : "application/json",
        },
      }
    );

    const data = await response.json()


    if(data.status == "success"){

        location.href = data.session.url

    }
    
    

  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            className="dark:bg-teal-600 dark:hover:bg-teal-700 w-full h-full hover:cursor-pointer bg-teal-600 text-white hover:bg-teal-700 hover:text-white text-md "
            variant="outline"
          >
            Proceed to Checkout
          </Button>
        </DialogTrigger>
        <DialogContent className=" sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Shipping Data</DialogTitle>
            <DialogDescription>
              please fill your shipping data
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="details">Details</Label>
              <Input ref={detailsInput} id="details" placeholder="Street address" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="city">City</Label>
              <Input ref={cityInput} id="city" placeholder="City name" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone">Phone</Label>
              <Input ref={phoneInput} id="phone" placeholder="Phone number" required />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="hover:cursor-pointer" variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              className="bg-teal-600 hover:bg-teal-700 hover:cursor-pointer" 
              type="button"
            >
              Cash
            </Button>
            <Button
              onClick={Checkoutsession}
              className="bg-teal-600 hover:bg-teal-700 hover:cursor-pointer"
              type="button"
            >
              Visa
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
