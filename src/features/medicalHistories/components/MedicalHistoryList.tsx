import { type MedicalHistoryDTO } from '../../../types/medicalHistory';

interface Props {
  items: MedicalHistoryDTO[];
}

export const MedicalHistoryList = ({ items }: Props) => {
  return (
    <ul>
      {items.map(h => (
        <li key={h.id}>
          <strong>Mascota ID: {h.petId}</strong> - Último chequeo: {h.lastCheckup}
          <p>{h.description} - {h.notes}</p>
        </li>
      ))}
    </ul>
  );
};
