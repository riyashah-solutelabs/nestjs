import { ObjectType, Field, Int } from '@nestjs/graphql';

//we create this schema is based on entity - and data we want to expose to the outer world e aama lkhie
//example we dont mention pw here
//based on this schema we implement resolver
@ObjectType()
export class Book {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field((type) => Int)
  price: number;
}
