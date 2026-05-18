import { render, screen } from '@testing-librareact';
import { describe, it, expect } from 'vitest';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from 'componendialog';

describe('Dialog components', () => {
  it('renders correctly', () => {
    render(
      <Dialog defaultOpen={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
            <DialogDescription>DescriptioDialogDescription>
         DialogHeader>
          <DialogFooter>
            <DialogClose>CerraDialogClose>
         DialogFooter>
       DialogContent>
     Dialog>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Cerrar')).toBeInTheDocument();
  });

  it('renders trigger correctly', () => {
    render(
      <Dialog>
        <DialogTrigger>OpeDialogTrigger>
     Dialog>
    );
    expect(screen.getByText('Open')).toBeInTheDocument();
  });
});
