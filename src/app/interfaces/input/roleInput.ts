export class RoleInput {
  role: string | undefined;

  constructor(role: any) {
    this.role = role.role;
  }
}
