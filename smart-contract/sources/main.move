module user_data::user_details {
    use std::string::String;
    use std::signer;
    use aptos_std::table::{Self, Table};

    // Error codes
    const E_NOT_AUTHORIZED: u64 = 1;
    const E_USER_DETAILS_EXIST: u64 = 2;
    const E_USER_DETAILS_DOES_NOT_EXIST: u64 = 3;
    const E_INVALID_INPUT: u64 = 4;

    // Struct to store user details
    struct UserDetails has key, store {
        name: String,
        father_name: String,
        date_of_birth: String,
        aadhar_number: String,
        pan_number: String,
    }

    // Resource to store all user details
    struct UserDetailsStore has key {
        details: Table<address, UserDetails>,
    }

    // Initialize the UserDetailsStore resource
    public entry fun initialize(account: &signer) {
        let addr = signer::address_of(account);
        // Only the contract's main address (e.g., @user_data) should initialize
        assert!(addr == @user_data, E_NOT_AUTHORIZED);
        move_to(account, UserDetailsStore {
            details: table::new(),
        });
    }

    // Validation functions
    fun validate_string_not_empty(str: &String) {
        assert!(std::string::length(str) > 0, E_INVALID_INPUT);
    }

    // Set user details
    public entry fun set_user_details(
        account: &signer,
        name: String,
        father_name: String,
        date_of_birth: String,
        aadhar_number: String,
        pan_number: String,
    ) acquires UserDetailsStore {
        let user_address = signer::address_of(account);

        // Ensure UserDetailsStore exists in the main address
        let details_store = borrow_global_mut<UserDetailsStore>(@user_data);

        // Validate inputs
        validate_string_not_empty(&name);
        validate_string_not_empty(&aadhar_number);
        validate_string_not_empty(&pan_number);

        // Check if user details already exist
        assert!(!table::contains(&details_store.details, user_address), E_USER_DETAILS_EXIST);

        // Create new user details
        let user_details = UserDetails {
            name,
            father_name,
            date_of_birth,
            aadhar_number,
            pan_number,
        };

        // Add user details to the store
        table::add(&mut details_store.details, user_address, user_details);
    }
    // Get user name
    #[view]
    public fun get_user_name(user_address: address): String acquires UserDetailsStore {
        let details_store = borrow_global<UserDetailsStore>(@user_data);
        assert!(table::contains(&details_store.details, user_address), E_USER_DETAILS_DOES_NOT_EXIST);
        let user_details = table::borrow(&details_store.details, user_address);
        user_details.name
    }

    // Get user father's name
    #[view]
    public fun get_father_name(user_address: address): String acquires UserDetailsStore {
        let details_store = borrow_global<UserDetailsStore>(@user_data);
        assert!(table::contains(&details_store.details, user_address), E_USER_DETAILS_DOES_NOT_EXIST);
        let user_details = table::borrow(&details_store.details, user_address);
        user_details.father_name
    }

    // Get user date of birth
    #[view]
    public fun get_date_of_birth(user_address: address): String acquires UserDetailsStore {
        let details_store = borrow_global<UserDetailsStore>(@user_data);
        assert!(table::contains(&details_store.details, user_address), E_USER_DETAILS_DOES_NOT_EXIST);
        let user_details = table::borrow(&details_store.details, user_address);
        user_details.date_of_birth
    }

    // Get user Aadhar number
    #[view]
    public fun get_aadhar_number(user_address: address): String acquires UserDetailsStore {
        let details_store = borrow_global<UserDetailsStore>(@user_data);
        assert!(table::contains(&details_store.details, user_address), E_USER_DETAILS_DOES_NOT_EXIST);
        let user_details = table::borrow(&details_store.details, user_address);
        user_details.aadhar_number
    }

    // Get user PAN number
    #[view]
    public fun get_pan_number(user_address: address): String acquires UserDetailsStore {
        let details_store = borrow_global<UserDetailsStore>(@user_data);
        assert!(table::contains(&details_store.details, user_address), E_USER_DETAILS_DOES_NOT_EXIST);
        let user_details = table::borrow(&details_store.details, user_address);
        user_details.pan_number
    }
}