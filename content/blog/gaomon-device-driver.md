---
title: How I Wrote a Device Driver for My Graphics Tablet
excerpt:  
active: true
date: 08/28/2026
image: none
alt: xxx
tags:
  - c
  - linux
  - device-drivers
  - operating-systems 
slug: gaomon-device-driver
---

Most of my activities in my spare time revolve around my two major hobbies: programming, and art. I often draw in my sketchbook, but I am nominally a digital artist as that's what I like to focus on. Doing digital art is thankfully very easy nowadays, all you need is a computer with software like Photoshop (or the FOSS alternative I use, [Krita](https://krita.org/)) and a device called a graphics tablet. My graphics tablet is essentially a screen equipped with a special stylus that when pressed on the screen, registers a mouse click, along with nice features like buttons for hotkeys and pressure sensitivity. While you can technically draw digitally with a mouse, or even a trackpad, it's much more ergonomic to imitate the way traditional art is done.

I use a graphics tablet called the [Gaomon PD1560](https://discord.com/invite/zy69eWtVb), which I have used for many years. I spent a lot of time developing my skills and learning the ins and outs of digital painting, and it worked wonderfully, until I decided to switch from Windows to Linux. Unfortunately, at the time Gaomon did not make Linux drivers for their tablets, (thankfully they do [now](https://prodsens.live/2026/01/19/gaomon-finally-released-full-featured-linux-drivers-for-their-graphic-tablets/)), which made the process of adapting my workflow to Linux difficult. I was able to get the tablet working through the use of a very helpful open source tool called [OpenTabletDriver](https://github.com/OpenTabletDriver/OpenTabletDriver), but this took a lot of configuring and frustrating errors, requiring me to boot up Windows whenever I wanted to draw for a few months.

All the while, I wondered if I could I wondered if I could sidestep this issue by writing my own device driver. After all, how hard could it be? I finally decided to pursue this idea as a semester project for my graduate level operating systems class. You can find the code for the driver [on my GitHub](https://github.com/AbhilashaTandon/Gaomon-PD1560-Device-Driver).

## Device Drivers on Linux

An I/O (Input/Output) device is any device used to interface with a computer and either receive input from the user or emit output to the user. Examples include keyboards, mice, disk drives, printers, and network cards. These devices translate physical actions into actions that software can process, such as key presses or mouse movements, and send output to the device to perform a function: data to display an image on a screen or produce a sound from a speaker. Connecting these devices to a computer requires writing a piece of code called a device driver—software that acts as a translator between the hardware (physical device) and the operating system, providing a standard interface. With a device driver, the code that manages a file system doesn’t need to worry about the specifics of the disk drive that contains its files. On Linux, device drivers are kernel modules: pieces of code that extend the functionality of the core part of the operating system. These modules can be easily loaded and unloaded without rebooting the system, for example, when a user plugs in a device to a USB port.

Linux is unique with respect to device drivers because it is a “monolithic kernel”, meaning device drivers and other kernel modules run in kernel space, unlike on Windows, where they are user programs. Because of this, device drivers are part of the Linux kernel itself: [about 60%](https://commandlinux.com/statistics/linux-kernel-contributors-lines-of-code-statistics/) of the Linux kernel source code is composed of device drivers. Since drivers must run within the kernel, the programmer is limited exclusively to libraries in the kernel source code. Development can be very risky since if the driver crashes, the entire kernel comes down with it. To mitigate the latter issue, I did all my development within a VirtualBox instance of Linux Mint identical to the one I use day to day. Writing this driver also required interacting with a few low-level APIs such as the Linux USB subsystem, the Linux input system, and the kernel module API. All code for the project also had to be written in C, which was made even more difficult by the inability to use debuggers or memory analyzers such as Valgrind to check for bugs in memory management.

## Writing the Driver

Before even starting to work on the driver, I tried to do some research into Linux device drivers and the USB protocol to get an overview of what exactly I needed to accomplish and the methods for doing so. There were a couple of resources that were extremely helpful starting out: [The Linux Kernel Module Programmers Guide](https://sysprog21.github.io/lkmpg/), [Linux Device Drivers](https://lwn.net/Kernel/LDD3/), and the [official kernel documentation](https://docs.kernel.org/). I also spent a lot of time looking through the Linux kernel source code on [this site](https://elixir.bootlin.com/linux/), mostly studying other device drivers to see how they worked. This didn't really prove to be fruitful, but I became very familiar with the cute mascot of the tool the site used to protect against LLM scrapers.

![The foxgirl mascot of Anubis](anubis_mascot.png "Anubis's Mascot")

My first step was simply to try and detect interactions with the tablet interface over the USB connection. This proved to be the hardest part of the project. Most of my issues 

## Results

