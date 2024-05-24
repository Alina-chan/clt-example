/// Module: octocat
module octocat::octocatx {
    // use sui::balance::{Self, Balance};
    use sui::coin::{Self, TreasuryCap};
    use sui::token::{Self};
    use sui::url;

    // Marker struct to create the currency
    public struct OCTOCATX has drop {}

    // Spend action witness
    public struct SpendCoin has drop {}

    fun init(otw: OCTOCATX, ctx: &mut TxContext) {
        let url = url::new_unsafe_from_bytes(b"https://www.nicepng.com/png/detail/183-1838159_exploring-github-github-octocat.png");
        let (treasury_cap, metadata) = coin::create_currency<OCTOCATX>(
            otw,
            2, // decimals
            b"OCTOCATX", // currency symbol.
            b"OCTOCATX", // currency name.
            b"OCTOCAT Closed Loop Token", // currency description.
            option::some(url),
            ctx,
        );

        let (mut policy, policy_cap) = token::new_policy<OCTOCATX>(&treasury_cap, ctx);

        // Add spend rule
        token::add_rule_for_action<OCTOCATX, SpendCoin>(
            &mut policy,
            &policy_cap,
            token::spend_action(),
            ctx,
        );

        token::share_policy(policy);
        transfer::public_transfer(policy_cap, tx_context::sender(ctx));
        transfer::public_freeze_object(metadata);
        transfer::public_transfer(treasury_cap, tx_context::sender(ctx));
    }

    // Mint tokens
    public fun mint<T>(cap: &mut TreasuryCap<T>, amount: u64, recipient: address, ctx: &mut TxContext) {
        let token = token::mint(cap, amount, ctx);
        let req = token::transfer(token, recipient, ctx);
        token::confirm_with_treasury_cap(cap, req, ctx);
    }
}

