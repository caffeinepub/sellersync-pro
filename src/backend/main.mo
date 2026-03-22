import Stripe "./stripe/stripe";
import OutCall "./http-outcalls/outcall";
import Text "mo:core/Text";

actor {

  // Stripe secret key - replace with real key via environment or admin call
  stable var stripeSecretKey : Text = "sk_test_placeholder";

  public shared func setStripeKey(key : Text) : async () {
    stripeSecretKey := key;
  };

  // Transform function required for HTTP outcalls consensus
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // Create a Stripe checkout session for a given plan
  // Returns the checkout URL to redirect the user to
  public shared ({ caller }) func createSubscriptionCheckout(
    planId : Text,
    successUrl : Text,
    cancelUrl : Text,
  ) : async Text {
    let config : Stripe.StripeConfiguration = {
      secretKey = stripeSecretKey;
      allowedCountries = [];
    };

    let planItem = switch (planId) {
      case "weekly" {
        ?{
          name = "SellerSync Pro - Weekly";
          desc = "Full access to all features, billed weekly";
          price = 999; // $9.99 in cents
        };
      };
      case "monthly" {
        ?{
          name = "SellerSync Pro - Monthly";
          desc = "Full access to all features, billed monthly";
          price = 2999; // $29.99 in cents
        };
      };
      case "yearly" {
        ?{
          name = "SellerSync Pro - Yearly";
          desc = "Full access to all features, billed yearly (save 31%)";
          price = 24999; // $249.99 in cents
        };
      };
      case _ { null };
    };

    switch (planItem) {
      case (null) { "ERROR:invalid_plan" };
      case (?item) {
        let items : [Stripe.ShoppingItem] = [{
          currency = "usd";
          productName = item.name;
          productDescription = item.desc;
          priceInCents = item.price;
          quantity = 1;
        }];
        await Stripe.createCheckoutSession(
          config,
          caller,
          items,
          successUrl,
          cancelUrl,
          transform,
        );
      };
    };
  };

  // Verify a completed Stripe checkout session
  public shared func verifyCheckoutSession(sessionId : Text) : async Bool {
    let config : Stripe.StripeConfiguration = {
      secretKey = stripeSecretKey;
      allowedCountries = [];
    };
    let result = await Stripe.getSessionStatus(config, sessionId, transform);
    switch (result) {
      case (#completed(_)) { true };
      case (#failed(_)) { false };
    };
  };
};
