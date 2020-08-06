import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { MemberEditComponent } from "../members/member-list/member-edit/member-edit.component";

@Injectable()
export class PreventUnsavedChanges
  implements CanDeactivate<MemberEditComponent> {
  canDeactivate(component: MemberEditComponent) {
    if (component.editForm.dirty) {
      return confirm(
        "Ești sigur ca dorești să continui? Orice modificare ar putea fi pierdută!"
      );
    }
    return true;
  }
}
