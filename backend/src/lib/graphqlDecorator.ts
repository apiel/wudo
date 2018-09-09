import {
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

export const ObjectType = <T extends {new(...args:any[]):{}}>(constructor:T) => {
    console.log('oui oui', constructor.name);
    // // const yo = new GraphQLObjectType({
    // //     name: constructor.name,
    // //     fields: {
    // //         id: { type: GraphQLString },
    // //     },
    // // });
    // // console.log('yoyo', yo);
    return class extends constructor {
        graphqlObjectType = {
            name: constructor.name,
            fields: {},
        };
        getGraphqlObjectType = () => new GraphQLObjectType(this.graphqlObjectType)
    }
}

export function Field () {
    return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {
        console.log('target', target);
        console.log('propertyKey', propertyKey);
        console.log('descriptor', descriptor);

        const t = Reflect.getMetadata("design:type", target, propertyKey);
        console.log(`${propertyKey} type: ${t.name}`);
        const type = t.name === 'String' ? GraphQLString : 'aie aie';
        // target.graphqlObjectType.fields[propertyKey] = {
        //     type,
        // }
    };
}
