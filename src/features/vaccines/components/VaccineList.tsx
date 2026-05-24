import { type VaccineDTO } from '../../../types/vaccine';

interface Props {
  items: VaccineDTO[];
}

export const VaccineList = ({ items }: Props) => {
  return (
    <ul>
      {items.map(v => (
        <li key={v.id}>
          <strong>{v.name}</strong> - {v.validityMonths} meses
          <p>{v.description}</p>
        </li>
      ))}
    </ul>
  );
};
