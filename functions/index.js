const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
admin.initializeApp();

/**
 * Webhook for AI Voice Attendant or Website Lead Form (2nd Gen).
 * Handles: CRM entry, SMS to Chris, Auto-Responder to lead, Newsletter opt-in.
 */
exports.handlenewlead = onRequest({cors: true}, async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { name, phone, email, service, notes, source } = req.body;

  try {
    // 1. Log to Firestore
    const leadRef = await admin.firestore().collection("leads").add({
      name,
      phone,
      email,
      service,
      notes,
      source: source || "Web Form",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: "new"
    });

    logger.info(`New lead created: ${leadRef.id} for ${name}`);

    // 2. Notify Chris via SMS (Mocked)
    console.log(`SMS sent to Chris for lead: ${name}`);

    // 3. Auto-Responder Email (Mocked)
    console.log(`Auto-responder sent to: ${email}`);

    // 4. Newsletter Sync (Mocked)
    console.log(`Added ${email} to newsletter list.`);

    res.status(200).json({ success: true, leadId: leadRef.id });
  } catch (error) {
    logger.error("Error processing lead:", error);
    res.status(500).json({ error: "Failed to process lead workflow" });
  }
});
