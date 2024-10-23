import { useEffect, useState } from 'react';
import './App.css';
import { SingleLine } from './components/SingleLine';
import { TagField } from './components/TagField';
import useTag from './hooks/useDeveloper';
import { AvailabilityData, DevRow } from './types/types';

const generateAvailability = (rows: number): AvailabilityData => {
  return Array.from({ length: rows }, () => Array(10).fill(1) as DevRow);
}

const getScore = (availability: AvailabilityData) => {
  let score = 0;

  availability.forEach( (singleRow) => {
    singleRow.forEach( (singleColumn) => {
      score = score + singleColumn;
    })
  })

  return score;
};

function App() {
  const { developers, handleAddDeveloper, handleRemoveDeveloper } = useTag();
  const [ availability, setAvailability ] = useState(generateAvailability(developers.length));
  const [ mdBudget, setMdBudget ] = useState(20);
  const [ carryOver, setCarryover ] = useState(0);

  const handleMdBudgetChange = (e: any) => { // TODO: I have no time for this shit
    setMdBudget(e.target.value);
  }

  const handleCarryoverChange = (e: any) => { // TODO: I have no time for this shit
    setCarryover(e.target.value);
  }

  const adjustAvailability = (): AvailabilityData => {
    const currentRowCount = availability.length;
  
    if (currentRowCount === developers.length) {
      return availability;
    }

    if (currentRowCount > developers.length) {
      return generateAvailability(developers.length);
    }
  
    const newRows: DevRow[] = Array.from(
      { length: developers.length - currentRowCount },
      () => Array(10).fill(1) as DevRow
    );
  
    return [...availability, ...newRows];
  }


  useEffect( () => {
    const newAvailability = adjustAvailability();

    setAvailability(newAvailability);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [developers] )


  const possibleTotalScore = developers.length * 10;

  const score = getScore(availability);


  const calcBudget = ( score * mdBudget ) / possibleTotalScore;
  
  const budgetWithCarryover = calcBudget - carryOver;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <svg className='w-5 h-5'>
              <path d="M4 0h12v2H4zM2 16h12v2H2zM3 8h12v2H3zM0 4h11v2H0zM7 12h11v2H7z"/>
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-center">MD Calculator</h1>
          <div></div>
        </div>
      </header>

      <main className="p-4">
        <div className="max-w-7xl mx-auto flex gap-4">
          <div className="w-1/2 bg-white p-4 shadow rounded">
            <fieldset>
              <label className='font-bold'>MD Budget:</label>
              <input type="number" className='ml-4 pl-2 border border-gray-300 rounded-md px-4 py-2 w-16' value={ mdBudget } onChange={handleMdBudgetChange} />
            </fieldset>
          </div>
          <div className="w-1/2 bg-white p-4 shadow rounded">
            <fieldset>
              <label className='font-bold'>Previous Sprint Carryover:</label>
              <input type="number" className='ml-4 pl-2 border border-gray-300 rounded-md px-4 py-2 w-16' value={ carryOver } onChange={handleCarryoverChange} />
            </fieldset>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex gap-4 mt-4">
          <div className="w-full bg-white p-4 shadow rounded">
            <fieldset>
              <label className='font-bold'>Developers:</label>
              <form>
                <TagField
                  developers={developers}
                  addDeveloper={handleAddDeveloper}
                  removeDeveloper={handleRemoveDeveloper}
                />
              </form>
            </fieldset>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex gap-4 mt-4">
          <div className="w-full bg-white p-4 shadow rounded">
            <div className="grid grid-cols-11 gap-4">
              <div key={-1} className=""></div>
              {Array.from({ length: 10 }, (_, index) => (
                <div key={index}>
                  <span className='font-bold text-gray-200 w-5 block text-center cursor-pointer'>{ index + 1 }</span>
                </div>
              ))}
            </div>
            { developers.map( (developer, index) => {
                return (
                  <SingleLine 
                    key={developer} 
                    name={ developer } 
                    availability={ availability } 
                    devIndex={index} 
                    setAvailability={ setAvailability }
                  />
                )
            } ) }
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex gap-4 mt-4">
          <div className="w-full bg-white p-10 shadow rounded text-center font-bold">
            <span style={ { fontSize: '300px' } }>{ Math.round(budgetWithCarryover * 2) / 2 }</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex gap-4 mt-1 text-center">
          <div className="w-full rounded text-center">
            <span className='text-gray-500 text-sm'>Copyright 2024 Styla GmbH - All Rights Reserved</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
