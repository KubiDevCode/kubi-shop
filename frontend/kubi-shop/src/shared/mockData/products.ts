import airpodsImg from './airpods.jpg'
import droneImg from './drone.jpg'
import gamepadImg from './gamepad.jpg'
import ipadImg from './ipad.jpg'
import iphoneImg from './iphone.jpg'
import laptopImg from './laptop.jpg'
import playstationImg from './playstation.jpg'
import tvImg from './tv.jpg'
import watchImg from './watch.jpg'

export type ProductCategory = 'phones' | 'accessories' | 'tablets' | 'watches' | 'gaming' | 'tv' | 'laptops'

export type Product = {
  id: number
  title: string
  price: string
  image: string
}

export const products: Product[] = [
  {
    id: 1,
    title: 'iPad (9th Gen)',
    price: '870',
    image: ipadImg,
  },
  {
    id: 2,
    title: 'Drone With Camera',
    price: '600',
    image: droneImg,
  },
  {
    id: 3,
    title: 'Apple Watch',
    price: '400',
    image: watchImg,
  },
  {
    id: 4,
    title: 'Ultra HD TV',
    price: '2000',
    image: tvImg,
  },
  {
    id: 5,
    title: 'AirPods Pro',
    price: '250',
    image: airpodsImg,
  },
  {
    id: 6,
    title: 'iPhone 15 Pro',
    price: '1200',
    image: iphoneImg,
  },
  {
    id: 7,
    title: 'Gaming Controller',
    price: '90',
    image: gamepadImg,
  },
  {
    id: 8,
    title: 'Laptop Pro 14',
    price: '1600',
    image: laptopImg,
  },
  {
    id: 9,
    title: 'PlayStation 5',
    price: '700',
    image: playstationImg,
  },
  {
    id: 1,
    title: 'iPad (9th Gen)',
    price: '870',
    image: ipadImg,
  },
  {
    id: 2,
    title: 'Drone With Camera',
    price: '600',
    image: droneImg,
  },
  {
    id: 3,
    title: 'Apple Watch',
    price: '400',
    image: watchImg,
  },
]
