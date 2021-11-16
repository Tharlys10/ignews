import { query as q } from "faunadb";

import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(subscription_id: string, customer_id: string, create_action: boolean = false) {
  // Buscar o usuario no DB do Fauna com o ID (customer_id);
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(
          q.Index('user_by_stripe_customer_id'),
          customer_id
        )
      )
    )
  );

  // Buscar dados da subscription no stripe
  const subscription = await stripe.subscriptions.retrieve(subscription_id);

  const subscription_data = {
    id: subscription.id,
    user_id: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  }

  // Save/Update os dados da subscription no Fauna;
  if (create_action) {
    await fauna.query(
      q.Create(
        q.Collection('subscriptions'),
        { 
          data: subscription_data
        }
      )
    );  
  } else {
    await fauna.query(
      q.Replace(
        q.Select(
          "ref",
          q.Get(
            q.Match(
              q.Index('subscription_by_id'),
              subscription_id
            )
          )
        ),
        {
          data: subscription_data
        }
      )
    )
  }
}