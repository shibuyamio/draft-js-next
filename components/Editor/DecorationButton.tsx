type Props = {
  handleFunction: () => void;
  description?: string;
  children: React.ReactChild;
};

const DecorationButton = ({ handleFunction, description, children }: Props) => (
  <div className="flex items-center">
    {description && <span className="sr-only">{description}</span>}
    <button onClick={handleFunction}>{children}</button>
  </div>
);

export default DecorationButton;
