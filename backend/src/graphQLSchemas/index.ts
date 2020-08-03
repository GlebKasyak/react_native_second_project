import { buildSchema } from "graphql";

import { UserMutations, UserQueries, UserTypes } from "./UserSchema";
import { MarketTypes, MarketQueries, MarketMutations } from "./MarketSchema";

export default buildSchema(`
    ${ UserTypes }
    ${ MarketTypes }
    
    type RootQuery {
        ${ UserQueries }
        ${ MarketQueries }
    }
    
    type RootMutation {
        ${ UserMutations }
        ${ MarketMutations }
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
