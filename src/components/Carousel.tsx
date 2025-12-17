"use client"

import Autoplay from 'embla-carousel-autoplay'
import React from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from 'next/image'
import heroimg1 from "../../public/hero-v1-image.png";
import heroimg2 from "../../public/hero-v1-image-1.png";
import heroimg3 from "../../public/hero-v1-image-2.png";

export default function CarouselHomeSection() {
  return <>
  
  <Carousel
            opts={{
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
          >
            <CarouselContent>
              <CarouselItem>
                <div className="flex justify-evenly items-center">
                  <div className=" space-y-5">
                    <span className=" block">Feel the real quality sound</span>
                    <h3 className="text-6xl font-bold max-w-sm">
                      Headphone ProMax
                    </h3>
                    <button className="bg-teal-600 flex items-center px-5 py-2 rounded-md text-white">
                      Shop now{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </button>
                  </div>
                  <Image src={heroimg1} width={470} height={470} alt="name" />
                </div>{" "}
              </CarouselItem>
              <CarouselItem>
                <div className="flex justify-evenly items-center">
                  <div className=" space-y-5">
                    <span className=" block">Deal of the weak</span>
                    <h3 className="text-6xl font-bold max-w-sm">
                      Powerful iPad Pro M1
                    </h3>
                    <button className="bg-teal-600 flex items-center px-5 py-2 rounded-md text-white">
                      Shop now{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </button>
                  </div>
                  <Image src={heroimg2} width={470} height={470} alt="name" />
                </div>
              </CarouselItem>
              <CarouselItem>
                {" "}
                <div className="flex justify-evenly items-center">
                  <div className=" space-y-5">
                    <span className=" block">Virtual reality glasses </span>
                    <h3 className="text-6xl font-bold max-w-sm">
                      Experience New Reality
                    </h3>
                    <button className="bg-teal-600 flex items-center px-5 py-2 rounded-md text-white">
                      Shop now{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </button>
                  </div>
                  <Image src={heroimg3} width={470} height={470} alt="name" />
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
  
  </>
}
