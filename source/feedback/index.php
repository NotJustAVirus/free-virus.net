<div class="main">
    <form method="post" action="">
        <label for="feedback">Your feedback:</label><br>
        <textarea id="feedback" name="feedback" rows="4" cols="50"></textarea><br>
        <br>
        <label for="contact_method">Preferred contact method:</label><br>
        <select name="contact_method" id="contact_method">
            <option value="none">None</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="discord">Discord</option>
            <option value="other">Other</option>
        </select>
        <input type="text" name="contact_method_value" id="contact_method_value" autocomplete="off" autofill="off" maxlength="255"><br>
        <br>
        <input type="submit" value="Send feedback">
        <?php
            include $_SERVER['DOCUMENT_ROOT']."/dbConnect.php";
            if (isset($_POST["feedback"])) {
                $feedback = $_POST["feedback"];
                $contact_method = $_POST["contact_method"];
                $contact_method_value = $_POST["contact_method_value"];
                $stmt = $conn->prepare("INSERT INTO feedback (content, contact_method, contact_method_value) VALUES (?, ?, ?)");
                $stmt->bind_param("sss", $feedback, $contact_method, $contact_method_value);
                $stmt->execute();
                $stmt->close();
                echo "<p>Feedback sent successfully!</p>";
            }
        ?>
    </form>
</div>