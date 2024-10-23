type TLlineProps = {
  name: string;
}

export const SingleLine = ({ name }: TLlineProps) => {
  
  return (
    <div className="flex flex-col mt-4">
      <div className="grid grid-cols-11 gap-4">
        <div key={-1} className="">
            { name }
        </div>
        {Array.from({ length: 10 }, (_, index) => (
          <div key={index}>
            <div className="border-solid border border-gray-200 w-5 h-5 rounded-sm" />
          </div>
        ))}
      </div>
    </div>
  );
};