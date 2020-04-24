import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MessagesComponent } from "./messages/messages.component";
import { ListsComponent } from "./lists/lists.component";
import { AuthGuard } from "./_guards/auth.guard";
import { MemberDetailComponent } from "./members/member-list/member-detail/member-detail.component";
import { MemberDetailResolver } from "./_resolver/member-detail.resolver";
import { MemberListResolver } from "./_resolver/member-list.resolver";
import { MemberEditComponent } from "./members/member-list/member-edit/member-edit.component";
import { MemberEditResolver } from "./_resolver/member-edit.resolver";
import { PreventUnsavedChanges } from "./_guards/prevent-unsaved-changes.guard";
import { ListResolver } from "./_resolver/lists.resolver";
import { MessagesResolver } from "./_resolver/messages.resolver";
import { AdminPanelComponent } from "./admin/admin-panel/admin-panel.component";
import { BrandsResolver } from './_resolver/brands.resolver';
import { ModelsResolver } from './_resolver/models.resolver';
import { PricesResolver } from './_resolver/prices.resolver';
import { KmsResolver } from './_resolver/kms.resolver';

export const appRoutes: Routes = [
  { path: "", 
  component: HomeComponent,
  resolve: {  brands : BrandsResolver,
              models: ModelsResolver,
              prices: PricesResolver,
              kms: KmsResolver} },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      {
        path: "members",
        component: MemberListComponent,
        resolve: { users: MemberListResolver },
      },
      {
        path: "members/:id",
        component: MemberDetailComponent,
        resolve: { user: MemberDetailResolver },
      },
      {
        path: "member/edit",
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsavedChanges],
      },
      {
        path: "messages",
        component: MessagesComponent,
        resolve: { messages: MessagesResolver },
      },
      {
        path: "lists",
        component: ListsComponent,
        resolve: { users: ListResolver },
      },
      {
        path: "admin",
        component: AdminPanelComponent,
        data: { roles: ["Admin"] },
      },
    ],
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];
