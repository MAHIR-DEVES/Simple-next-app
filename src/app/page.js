import React from 'react'
import Hero from './components/Hero'
import Products from './components/(homepageCom)/Products'


export default async function Page() {
  return (
    <div className='min-h-screen'>
      <Hero/>
      <Products/>
    </div>
  )
}