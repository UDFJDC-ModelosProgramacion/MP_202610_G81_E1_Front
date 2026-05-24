import { type VaccinationRecordDTO } from '../../../types/vaccinationRecord';

interface Props {
  items: VaccinationRecordDTO[];
}

export const VaccinationRecordList = ({ items }: Props) => {
  return (
    <ul>
      {items.map(r => (
        <li key={r.id}>
          {r.applicationDate} - Vacuna ID: {r.vaccineId} - Mascota ID: {r.petId}
          <p>{r.notes}</p>
        </li>
      ))}
    </ul>
  );
};
