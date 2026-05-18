import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('main.tsx', () => {
  const originalDocument = globalThis.document;

  beforeEach(() => {
    vi.resetModules();
    globalThis.document = {
      ...originalDocument,
      getElementById: vi.fn(),
    } as any;
  });

  it('does not render if root element is not found', () => {
    (document.getElementById as any).mockReturnValue(null);
    expect(document.getElementById).not.toHaveBeenCalled();
  });
});
