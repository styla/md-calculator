import { AcceptedValues, AvailabilityData, DevRow } from "../types/types";

type TLlineProps = {
  name: string;
  availability: AvailabilityData;
  devIndex: number;
  setAvailability: ( availibility: AvailabilityData ) => void;
}

const getFill = ( value: AcceptedValues ): string => {
  switch (value) {
    case 0.5:
        return 'linear-gradient(45deg, #A2E297 50%, transparent 50%)';

    case 0:
        return 'none';

    case 1:
        return '#A2E297';
  }
}

const getNewValue = ( value: AcceptedValues ): number => {
  switch (value) {
    case 0.5:
        return 1;

    case 0:
        return 0.5;

    case 1:
        return 0;
  }
}

export const SingleLine = ({ name, availability, devIndex, setAvailability }: TLlineProps) => {

  const devAvailability = availability[devIndex];

  const handleClick = (index: number) => {

    const getNewArray = () => {

      return availability.map((row, rowIndex) => {
        if (rowIndex === devIndex) {
            return row.map((value, colIndex) =>
                colIndex === index ? getNewValue(value) : value
            ) as DevRow;
        }
        return row;
    });

    }

    const newArray = getNewArray();
    console.log("🟡 KOSEDEBUG: handleClick -> newArray", newArray)


    setAvailability(newArray);

    

    
  

  }


  return (
    <div className="flex flex-col mt-4">
      <div className="grid grid-cols-11 gap-4">
        <div key={-1} className="">
            { name }
        </div>
        {Array.from({ length: 10 }, (_, index) => {

          const specificAvailability = devAvailability?.[index];

          return (
            <div key={index}>
              <div 
                className="border-solid border border-gray-200 w-5 h-5 rounded-sm" 
                style={ { background: getFill(specificAvailability) } }
                onClick={ () => handleClick(index) }
              />
            </div>
          )
        })}
      </div>
    </div>
  );
};