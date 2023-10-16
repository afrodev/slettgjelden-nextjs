import InputField from '@/components/InputField';
import React from 'react';

export default function Home() {
  return (
    <body className="m-0">    
      <div className="flex justify-center">
        <form className='max-w [1200px]'>
          {/* Denne trenger å kunne gjentas med en + knapp slik at en person kan ha flere kreditorer, med flere saksnret
          Det betyr at Saksnr eier beløp, rente og sum etter 5 år og at Kreditor eier Saksnr*/ }
          <div className="flex flex-col">
            <h2>Kreditor</h2>
            <InputField name={"Kreditor"} />
            <InputField name={"Saksnr."} />
            <InputField name={"Beløp"} />
            <InputField name={"Rente"} />
            
          </div>
          <InputField name={"Sluttsum etter 5 år"} />
          
          <div className="flex flex-col">
            <h2>Kunden</h2>
            <InputField name={"Kundens navn"} />
            <InputField name={"Lønn"} />
            <InputField name={"Partners lønn"} />
            <InputField name={"Barn 0-5 år"} />
            <InputField name={"Barn 6–10 år"} />
            <InputField name={"Barn 11–14 år"} />
            <InputField name={"Barn 15 år og oppover"} />
            <InputField name={"Boliglån"} />
            <InputField name={"Boliglånsrente"} />
            <InputField name={"Leiekostnader"} />
          </div>


          <div className="flex flex-col">
            <h2>Resultat</h2>
            <InputField name={"Overskuddssssss"} />

          </div>

        </form>
      </div>
    </body>
  );
}