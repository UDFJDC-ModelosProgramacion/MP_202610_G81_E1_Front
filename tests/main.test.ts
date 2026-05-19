import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('react-dom/client', () => ({
  createRoot: vi.fn().mockReturnValue({
    render: vi.fn(),
  }),
}));

vi.mock('../src/App', () => ({
  default: () => null,
}));

describe('main.tsx', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    document.body.innerHTML = '<div id="root"></div>';
  });

  it('renders without crashing', async () => {
    // Import main.tsx to trigger execution
    await import('../src/main');
    const { createRoot } = await import('react-dom/client');
    expect(createRoot).toHaveBeenCalledWith(document.getElementById('root'));
  });

  it('does not render if root element is missing', async () => {
    document.body.innerHTML = '';
    vi.resetModules();
    const { createRoot } = await import('react-dom/client');
    await import('../src/main');
    
    expect(createRoot).not.toHaveBeenCalled();
  });
});
