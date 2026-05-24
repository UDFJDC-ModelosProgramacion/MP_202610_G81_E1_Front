import { type MedicalEventDetailDTO } from '../../../types/medicalEvent';

interface Props {
  items: MedicalEventDetailDTO[];
}

export const MedicalEventList = ({ items }: Props) => {
  return (
    <ul>
      {items.map(ev => (
        <li key={ev.id}>
          {ev.eventDate} - {ev.eventType} - {ev.diagnosis} ({ev.treatment})
        </li>
      ))}
    </ul>
  );
};
