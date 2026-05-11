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
                <div className="flex flex-col-reverse items-center justify-evenly gap-8 px-4 py-8 text-center lg:flex-row lg:text-left">
                  <div className="space-y-5 max-w-sm">
                    <span className="block text-sm sm:text-base">Feel the real quality sound</span>
                    <h3 className="text-3xl sm:text-4xl lg:text-6xl font-bold max-w-sm mx-auto lg:mx-0">
                      Headphone ProMax
                    </h3>
                    <button className="bg-teal-600 inline-flex items-center justify-center px-5 py-2 rounded-md text-white mx-auto lg:mx-0">
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
                  <Image className="w-full max-w-[260px] sm:max-w-sm lg:max-w-[470px] h-auto" src={heroimg1} width={470} height={470} alt="name" />
                </div>{" "}
              </CarouselItem>
              <CarouselItem>
                <div className="flex flex-col-reverse items-center justify-evenly gap-8 px-4 py-8 text-center lg:flex-row lg:text-left">
                  <div className="space-y-5 max-w-sm">
                    <span className="block text-sm sm:text-base">Deal of the weak</span>
                    <h3 className="text-3xl sm:text-4xl lg:text-6xl font-bold max-w-sm mx-auto lg:mx-0">
                      Powerful iPad Pro M1
                    </h3>
                    <button className="bg-teal-600 inline-flex items-center justify-center px-5 py-2 rounded-md text-white mx-auto lg:mx-0">
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
                  <Image className="w-full max-w-[260px] sm:max-w-sm lg:max-w-[470px] h-auto" src={heroimg2} width={470} height={470} alt="name" />
                </div>
              </CarouselItem>
              <CarouselItem>
                {" "}
                <div className="flex flex-col-reverse items-center justify-evenly gap-8 px-4 py-8 text-center lg:flex-row lg:text-left">
                  <div className="space-y-5 max-w-sm">
                    <span className="block text-sm sm:text-base">Virtual reality glasses </span>
                    <h3 className="text-3xl sm:text-4xl lg:text-6xl font-bold max-w-sm mx-auto lg:mx-0">
                      Experience New Reality
                    </h3>
                    <button className="bg-teal-600 inline-flex items-center justify-center px-5 py-2 rounded-md text-white mx-auto lg:mx-0">
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
                  <Image className="w-full max-w-[260px] sm:max-w-sm lg:max-w-[470px] h-auto" src={heroimg3} width={470} height={470} alt="name" />
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
  
  </>
}
