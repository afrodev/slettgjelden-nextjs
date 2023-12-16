"use client"
import { useState } from "react";
import InputField from "./InputField";
import { type } from "os";

type FormDataType = {
  'Kreditor': string;
  'Saksnummer': number;
  'Beløp': number;
  'Rente': number;
  'Kundens navn': string;
  'Lønn': number;
  'Partners lønn': number;
  "Barn 0-5 år": number;
  "Barn 6–10 år": number;
  "Barn 11–14 år": number;
  "Barn 15 år og oppover": number;
  "Boliglån": number;
  "Boliglånsrente": number;
  "Leiekostnader": number;
}

type OutputFieldsType = {
  'Totalt gjeld etter 5 år': number;
  'Overskuddet i lønn': number;
  'Prosent av gjeld per kreditor': number;
  // 'Sluttsum av hver sak etter 5 år med renten tilhørende den saken': number;
}

export default function MyForm() {
  const [formData, setFormData] = useState({
    'Kreditor': '',
    'Saksnummer': 0,
    'Beløp': 0,
    'Rente': 0,
    
    'Kundens navn': '',
    'Lønn': 0,
    'Partners lønn': 0,
    "Barn 0-5 år": 0,
    "Barn 6–10 år": 0,
    "Barn 11–14 år": 0,
    "Barn 15 år og oppover": 0,
    "Boliglån": 0,
    "Boliglånsrente": 0,
    "Leiekostnader": 0,
    
  })

  const [output, setOutput] = useState('');

  const [outputFields, setOutputFields] = useState<OutputFieldsType>({
    'Totalt gjeld etter 5 år': 0,
    'Overskuddet i lønn': 0,
    'Prosent av gjeld per kreditor': 0,
    // 'Sluttsum av hver sak etter 5 år med renten tilhørende den saken': 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (['Saksnummer', 'Beløp', 'Rente', 'Lønn', 'Partners lønn', "Barn 0-5 år", "Barn 6–10 år", "Barn 11–14 år", "Barn 15 år og oppover", "Boliglån", "Boliglånsrente", "Leiekostnader"].includes(e.target.name)) {
      value = e.target.value === '' ? '' : parseFloat(e.target.value);
    }
    setFormData({
      ...formData, 
      [e.target.name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    if (!isNaN(formData['Beløp']) && !isNaN(formData['Rente']) && !isNaN(formData['Lønn']) && !isNaN(formData['Leiekostnader'])) {
      const totalOwed = calculateTotalOwed(formData['Beløp'], formData['Rente']);
      const incomeSurplus = formData['Lønn'] - formData['Leiekostnader'];
      const percentageOfDebt = (formData['Beløp'] / totalOwed) * 100;
      setOutputFields(prevState => ({ 
        ...prevState, 
        'Totalt gjeld etter 5 år': totalOwed,
        'Overskuddet i lønn': incomeSurplus,
        'Prosent av gjeld per kreditor': percentageOfDebt,
      }));
    }
  }

  const calculateTotalOwed = (amount: number, interest: number) => {
    let total = amount;
    for (let i = 0; i < 5; i++) {
      total += total * (interest / 100);
    }
    return total;
  }

  return (
<div className="flex justify-center">
        <form className='max-w [1200px]' onSubmit={handleSubmit}>
          {/* Denne trenger å kunne gjentas med en + knapp slik at en person kan ha flere kreditorer, med flere saksnret
          Det betyr at Saksnr eier beløp, rente og sum etter 5 år og at Kreditor eier Saksnr*/ }
          <div className="flex flex-col">
            <h2 className='self-center'>Kreditor</h2>
            <InputField name={"Kreditor"} value={formData['Kreditor']} onChange={handleChange} />
            <InputField name={"Saksnummer"} value={formData['Saksnummer']} onChange={handleChange} />
            <InputField name={"Beløp"} value={formData['Beløp']} onChange={handleChange} />
            <InputField name={"Rente"} value={formData['Rente']} onChange={handleChange} />
            
          </div>
          {/* <InputField name={"Sluttsum etter 5 år"} /> */}
          
          <div className="flex flex-col">
            <h2 className='self-center'>Kunden</h2>
            <InputField name={"Kundens navn"} value={formData['Kundens navn']} onChange={handleChange} />
            <InputField name={"Lønn"} value={formData['Lønn']} onChange={handleChange} />
            <InputField name={"Partners lønn"} value={formData['Partners lønn']} onChange={handleChange} />
            <InputField name={"Barn 0-5 år"} value={formData['Barn 0-5 år']} onChange={handleChange} />
            <InputField name={"Barn 6–10 år"} value={formData['Barn 6–10 år']} onChange={handleChange} />
            <InputField name={"Barn 11–14 år"} value={formData['Barn 11–14 år']} onChange={handleChange} />
            <InputField name={"Barn 15 år og oppover"} value={formData['Barn 15 år og oppover']} onChange={handleChange} />
            <InputField name={"Boliglån"} value={formData['Boliglån']} onChange={handleChange} />
            <InputField name={"Boliglånsrente"} value={formData['Boliglånsrente']} onChange={handleChange} />
            <InputField name={"Leiekostnader"} value={formData['Leiekostnader']} onChange={handleChange} />
          </div>

          <div className="flex flex-col">
            <h2 className='self-center'>Resultat</h2>
            {/* <InputField name={"Overskuddssssss"} /> */}

          </div>

          <button type="submit" className='bg-blue-500 text-white rounded-lg px-6 pb-2 pt-2.5 uppercase'>Submit</button>
          <pre>{JSON.stringify(outputFields, null, 2)}</pre>

        </form>
      </div>
  )
}