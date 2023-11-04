"use client"
import InputField from '@/components/InputField';
import React, { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    'Kreditor': '',
    'Saksnummer': '',
    'Beløp':'',
    'Rente': '',
    
    'Kundens navn': '',
    'Lønn': '',
    'Partners lønn': '',
    "Barn 0-5 år": '',
    "Barn 6–10 år": '',
    "Barn 11–14 år": '',
    "Barn 15 år og oppover": '',
    "Boliglån": '',
    "Boliglånsrente": '',
    "Leiekostnader": '',
    
    /** DOOOO THIS BASED ON CHATGPT AFTER LUNCH BREAK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
    /* GREAT I DID IT!!!!!! */
  })

  const [output, setOutput] = useState('');

  const handleChange = (e: any) => {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setOutput(JSON.stringify(formData, null, 2))
  }

  return (
    <body className="m-0">    
      <div className="flex justify-center">
        <form className='max-w [1200px]' onSubmit={handleSubmit}>
          {/* Denne trenger å kunne gjentas med en + knapp slik at en person kan ha flere kreditorer, med flere saksnret
          Det betyr at Saksnr eier beløp, rente og sum etter 5 år og at Kreditor eier Saksnr*/ }
          <div className="flex flex-col">
            <h2 className='self-center'>Kreditor</h2>
            <InputField name={"Kreditor"} value={formData.kreditor} onChange={handleChange} />
            <InputField name={"Saksnummer"} value={formData.saksnr} onChange={handleChange} />
            <InputField name={"Beløp"} value={formData.beløp} onChange={handleChange} />
            <InputField name={"Rente"} value={formData.rente} onChange={handleChange} />
            
          </div>
          {/* <InputField name={"Sluttsum etter 5 år"} /> */}
          
          <div className="flex flex-col">
            <h2 className='self-center'>Kunden</h2>
            <InputField name={"Kundens navn"} value={formData.kundensNavn} onChange={handleChange} />
            <InputField name={"Lønn"} value={formData.lønn} onChange={handleChange} />
            <InputField name={"Partners lønn"} value={formData.partnersLønn} onChange={handleChange} />
            <InputField name={"Barn 0-5 år"} value={formData.barn0til5} onChange={handleChange} />
            <InputField name={"Barn 6–10 år"} value={formData.barn6til10} onChange={handleChange} />
            <InputField name={"Barn 11–14 år"} value={formData.barn11til14} onChange={handleChange} />
            <InputField name={"Barn 15 år og oppover"} value={formData.barn15ogOpp} onChange={handleChange} />
            <InputField name={"Boliglån"} value={formData.boliglån} onChange={handleChange} />
            <InputField name={"Boliglånsrente"} value={formData.boliglånsrente} onChange={handleChange} />
            <InputField name={"Leiekostnader"} value={formData.leiekostnader} onChange={handleChange} />
          </div>


         

          <div className="flex flex-col">
            <h2 className='self-center'>Resultat</h2>
            {/* <InputField name={"Overskuddssssss"} /> */}

          </div>

          <button type="submit" className='bg-blue-500 text-white rounded-lg px-6 pb-2 pt-2.5 uppercase'>Submit</button>
          <pre>{output}</pre>

        </form>
      </div>
    </body>
  );
}