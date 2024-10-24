import { AcceptedValues, AvailabilityData, DevRow } from "../types/types";

type TLlineProps = {
  name: string;
  availability: AvailabilityData;
  devIndex: number;
  setAvailability: ( availability: AvailabilityData ) => void;
  onRowClick: (index: number) => void;
}

const GREEN = "#22c55e";

const getPercentage = ( value: AcceptedValues ): string => {
  switch (value) {
    case 0.5:
        return "50%";

    case 0:
        return '0';

    case 1:
        return "100%";
  }
}

export const getNewValue = ( value: AcceptedValues ): number => {
  switch (value) {
    case 0.5:
        return 1;

    case 0:
        return 0.5;

    case 1:
        return 0;
  }
}

export const SingleLine = ({ name, availability, devIndex, setAvailability, onRowClick }: TLlineProps) => {

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

    setAvailability(newArray);

  }


  return (
    <div className="flex flex-col mt-4">
      <div className="grid grid-cols-11 gap-4">
        <div key={-1} className="">
            <span onClick={ () => onRowClick(devIndex) } className="cursor-pointer select-none">{ name }</span>
        </div>
        {Array.from({ length: 10 }, (_, index) => {

          const specificAvailability = devAvailability?.[index];

          return (
            <div key={index}>
              <div 
                className="border-solid border border-gray-200 w-full h-5 rounded-sm cursor-pointer" 
                style={ { 
                  backgroundImage: `linear-gradient(90deg, ${GREEN} 100%, transparent 100%)`,
                  transition: 'background-size 0.5s ease',
                  backgroundSize: `${ getPercentage(specificAvailability) } 100%`,
                  backgroundRepeat: 'no-repeat'
                }}
                onClick={ () => handleClick(index) }
              />
            </div>
          )
        })}
      </div>
    </div>
  );
};