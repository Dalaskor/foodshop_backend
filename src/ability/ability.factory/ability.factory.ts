import { ROLES } from "@app/common";
import { Profile, User } from "@app/models";
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

export type Subjects = InferSubjects<typeof User | typeof Profile> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
    profileForUser(user: User) {
        const { can, cannot, build } = new AbilityBuilder(
            Ability as AbilityClass<AppAbility>,
        );

        if (this.checkAdmin(user)) {
            can(Action.Manage, 'all');
        } else {
            can(Action.Read, Profile);
        }

        can(Action.Update, Profile, { fk_profileid: user.id });
        can(Action.Delete, Profile, { fk_profileid: user.id });

        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<Subjects>,
        });
    }

    checkAdmin(user: User): Boolean {
        for (let i = 0; i < user.roles.length; i++) {
            if (user.roles[i].value === ROLES.ADMIN) {
                return true;
            }
        }
        return false;
    }
}
