window.onload = async function() {
    var contactMethodSelect = $("#contact_method");
    var contactMethodValueInput = $("#contact_method_value");

    function updateContactMethodValueInput() {
        var selectedMethod = contactMethodSelect.val();
        if (selectedMethod === "none") {
            contactMethodValueInput.hide();
        } else {
            contactMethodValueInput.show();
            switch (selectedMethod) {
                case "email":
                    contactMethodValueInput.attr("placeholder", "name@example.com");
                    break;
                case "phone":
                    contactMethodValueInput.attr("placeholder", "+1 234-567-8901");
                    break;
                case "discord":
                    contactMethodValueInput.attr("placeholder", "username");
                    break;
                case "other":
                    contactMethodValueInput.attr("placeholder", "e.g. Telegram: @handle");
                    break;
            }
        }
    }

    // Initial call to set the correct state on page load
    updateContactMethodValueInput();

    // Update the input field whenever the selection changes
    contactMethodSelect.change(updateContactMethodValueInput);
}