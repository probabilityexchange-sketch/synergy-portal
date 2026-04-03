// functions/index.js
const { onRequest } = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');
const admin = require('firebase-admin');

admin.initializeApp();

// ── handleNewLead ───────────────────────────────────────────────────────────
// Receives lead form submissions → Firestore leads collection
// Future: SMS to Chris via Twilio (CHRIS_CELL env var, never in source)

exports.handleNewLead = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { name, phone, email, service, message, notes, source } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'name and phone are required' });
  }

  try {
    const leadRef = await admin.firestore().collection('leads').add({
      name,
      phone,
      email: email || null,
      service: service || null,
      notes: message || notes || null,
      source: source || 'Web Form',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'new',
    });

    logger.info('New lead created', { leadId: leadRef.id, source });

    // TODO (next phase): Send SMS to Chris via Twilio
    // const chris = process.env.CHRIS_CELL;
    // await twilioClient.messages.create({ to: chris, from: process.env.TWILIO_FROM, body: `New lead: ${name} ${phone}` });

    res.status(200).json({ success: true, leadId: leadRef.id });
  } catch (err) {
    logger.error('handleNewLead error', err);
    res.status(500).json({ error: 'Failed to process lead' });
  }
});

// ── handleEmailSignup ───────────────────────────────────────────────────────
// Receives email opt-in → Firestore subscribers collection

exports.handleEmailSignup = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { email, source } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  try {
    // Upsert by email to avoid duplicates
    const existing = await admin.firestore()
      .collection('subscribers')
      .where('email', '==', email.toLowerCase())
      .limit(1)
      .get();

    if (existing.empty) {
      await admin.firestore().collection('subscribers').add({
        email: email.toLowerCase(),
        source: source || 'website',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        status: 'active',
      });
    }

    logger.info('Email signup', { source });
    res.status(200).json({ success: true });
  } catch (err) {
    logger.error('handleEmailSignup error', err);
    res.status(500).json({ error: 'Failed to save subscription' });
  }
});

// ── handleChat ──────────────────────────────────────────────────────────────
// Chat widget stub — returns a placeholder reply
// Replace the body with Claude/OpenAI API call when ready

const MAX_CHAT_MESSAGE_LENGTH = 2000;

exports.handleChat = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message is required' });
  }

  if (message.length > MAX_CHAT_MESSAGE_LENGTH) {
    return res.status(400).json({ error: 'message too long' });
  }

  logger.info('Chat message received', { length: message.length });

  // ── STUB: Replace this block with AI API call ──
  const reply = [
    'Thanks for your message! For immediate assistance, please call us at (877) 259-9187.',
    'Great question. Our team handles motor rewind, servo repair, VFD/drive repair, and PLC repair. Want to request a quote?',
    'We serve the Chattanooga metro, North Alabama, and NW Georgia with free pickup and delivery within 100 miles of Stevenson, AL.',
  ][Math.floor(Math.random() * 3)];
  // ── END STUB ──

  res.status(200).json({ reply });
});

// ── handleInboundCall ───────────────────────────────────────────────────────
// Twilio webhook for inbound calls — ElevenLabs AI voice (DISABLED by default)
// To enable: set ELEVENLABS_ENABLED=true in Firebase env and point Twilio webhook here.
// Default behavior: thank the caller and hang up (VOIP handles the actual call).
// agentId is sourced from server-side env only — never from request input.

exports.handleInboundCall = onRequest({ cors: false }, async (req, res) => {
  const enabled = process.env.ELEVENLABS_ENABLED === 'true';

  res.set('Content-Type', 'text/xml');

  if (!enabled) {
    // ElevenLabs not enabled — this endpoint should not be receiving calls.
    // Return minimal TwiML.
    return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Thank you for calling Synergy Industrial Solutions. Please hold.</Say>
  <Hangup/>
</Response>`);
  }

  // ElevenLabs Conversational AI via Twilio Media Streams
  // Replace ELEVENLABS_AGENT_ID with your actual agent ID from ElevenLabs dashboard.
  const agentId = process.env.ELEVENLABS_AGENT_ID || '';
  const wsUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${agentId}`;

  return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect>
    <Stream url="${wsUrl}">
      <Parameter name="agent_id" value="${agentId}"/>
    </Stream>
  </Connect>
</Response>`);
  // Note: Transfer to Chris's cell is handled by the ElevenLabs agent via a
  // tool call that triggers a separate Twilio REST API call using CHRIS_CELL env var.
});
