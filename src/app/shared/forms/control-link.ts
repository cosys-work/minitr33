import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

export class ControlLinker<T extends AbstractControl = AbstractControl> {

  protected links: Set<T> = new Set();
  protected subscriptions: Map<T, Subscription> = new Map();

  get value(): any {
    const [control] = Array.from(this.links);
    return control.value;
  }

  public link(control: T): void {
    const subscription = control.valueChanges.subscribe(
      (value) => this.patchValue(value, { emitEvent: false })
    );
    this.subscriptions.set(control, subscription);
    this.links.add(control);
    this.patchValue(this.value, { emitEvent: false });
  }

  public unlink(control: T): void {
    this.subscriptions.get(control)?.unsubscribe();
    this.links.delete(control);
  }

  public patchValue(value: any, options?: Object): void {
    this.links.forEach(link => link.patchValue(value, options));
  }

  public dispose(): void {
    this.links.forEach((link) => this.unlink(link));
  }

}
