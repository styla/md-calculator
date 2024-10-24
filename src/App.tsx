import { useEffect, useState } from 'react';
import './App.css';
import { getNewValue, SingleLine } from './components/SingleLine';
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
  
  const personToData = new Map();
  
  const updatePersonToData = () => {
    developers.forEach((developer, index) => {
      personToData.set(developer, availability[index]);
    })
  };

  updatePersonToData();


  const recreateAvailability = () => {
    return developers.map( (developer) => {
      return personToData.get(developer);
    } )
  };

  const handleMdBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setMdBudget(isNaN(value) ? 0 : value);
  }

  const handleCarryoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCarryover(isNaN(value) ? 0 : value);
  }

  const adjustAvailability = (): AvailabilityData => {
    const currentRowCount = availability.length;
  
    if (currentRowCount === developers.length) {
      return availability;
    }

    if (currentRowCount > developers.length) {
      return recreateAvailability();
    }
  
    const newRows: DevRow[] = Array.from(
      { length: developers.length - currentRowCount },
      () => Array(10).fill(1) as DevRow
    );

    updatePersonToData();
  
    return [...availability, ...newRows];
  }

  const toggleColumns = (columnIndex: number): AvailabilityData => {
    return availability.map((row) => {
      const updatedRow = row.map((value, index) => 
        index === columnIndex ? getNewValue(availability[0][columnIndex]) : value
      ) as DevRow;
  
      return updatedRow;
    });
  }

  const toggleRows = (rowIndex: number): AvailabilityData => {
    return availability.map((row, index) => {
      if (index === rowIndex) {
        return row.map(() => getNewValue(availability[rowIndex][0])) as DevRow;
      }
      
      return row;
    });
  }

  const onColumnClick = (index: number) => {
    const updatedData = toggleColumns(index);
    setAvailability(updatedData);
  }

  const onRowClick = (index: number) => {
    const updatedData = toggleRows(index);
    setAvailability(updatedData);
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
                  <span onClick={ () => onColumnClick(index) } className='font-bold text-gray-200 w-5 block text-center cursor-pointer select-none'>{ index + 1 }</span>
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
                    onRowClick={ onRowClick }
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
            <span className='text-gray-500 text-sm'>Copyright 2024 Styla GmbH - All Rights Reserved - <a href="https://github.com/styla/md-calculator">Source Code</a></span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
