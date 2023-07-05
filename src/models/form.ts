export class FormBase<T> {
  value: T;
  label: string;
  metadata: string;
  name: string;
  obligatoire: boolean;
  type: string;
  options: string[];
  order: number;
  hint: string;
  controlType: string;

  constructor(options: {
    value?: T;
    label?: string;
    metadata?: string;
    name?: string;
    obligatoire?: boolean;
    type?: string;
    options?: string[];
    order?: number;
    hint?: string;
    controlType?: string;
  } = {}) {
    this.value = options.value;
    this.label = options.label || '';
    this.metadata = options.metadata || '';
    this.name = options.name || '';
    this.obligatoire = !!options.obligatoire;
    this.type = options.type || '';
    this.options = options.options || [];
    this.order = options.order === undefined ? 1 : options.order;
    this.hint = options.hint || '';
    this.controlType = options.controlType || '';
  }
}
