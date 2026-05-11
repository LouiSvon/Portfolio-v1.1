import type { Locale } from "@/types";

export default function PromptContent({ locale }: { locale: Locale }) {
  if (locale === "en") return <EnContent />;
  return <FrContent />;
}

function FrContent() {
  return (
    <div className="prose">
      <h2 id="chain-of-thought">Chain-of-thought prompting</h2>
      <p>
        Le <strong>chain-of-thought</strong> (chaîne de raisonnement) est une
        technique qui consiste à demander au modèle de décomposer son
        raisonnement étape par étape avant de donner la réponse finale. L&apos;effet
        est frappant sur les tâches complexes : les erreurs diminuent
        significativement parce que le modèle &quot;réfléchit à voix haute&quot; au lieu
        de court-circuiter vers une réponse intuitive.
      </p>
      <p>
        <strong>Comment l&apos;activer</strong> : ajoutez simplement &quot;Raisonne
        étape par étape avant de répondre.&quot; ou &quot;Pensons à cela
        méthodiquement : ...&quot; à votre prompt.
      </p>
      <p>
        <strong>Cas d&apos;usage idéaux</strong> : résolution de problèmes logiques,
        debug de code, analyse d&apos;arguments, estimation de coûts, planification
        de projets.
      </p>
      <p>
        <strong>Cas à éviter</strong> : tâches simples ou factuelles où le
        chain-of-thought rallonge inutilement la réponse sans apporter de
        valeur.
      </p>

      <h2 id="few-shot-learning">Few-shot learning</h2>
      <p>
        Le <strong>few-shot learning</strong> consiste à fournir quelques
        exemples d&apos;entrée/sortie dans le prompt pour montrer au modèle
        exactement ce qu&apos;on attend. C&apos;est l&apos;une des techniques les plus
        efficaces pour contrôler le format de sortie.
      </p>
      <p>
        <strong>Exemple</strong> :
      </p>
      <p>
        Classifie le sentiment des phrases suivantes :<br />
        &quot;Ce produit est excellent.&quot; → Positif<br />
        &quot;Je suis très déçu.&quot; → Négatif<br />
        &quot;C&apos;est correct, ni bien ni mal.&quot; → Neutre<br />
        &quot;Jamais vu quelque chose d&apos;aussi efficace !&quot; → ?
      </p>
      <p>
        Le modèle comprend immédiatement le format attendu — une seule étiquette
        — et produit une réponse cohérente. Avec zero-shot (sans exemples), les
        réponses varient plus en format et en verbosité.
      </p>
      <p>
        <strong>Règle pratique</strong> : 2 à 5 exemples suffisent dans la
        plupart des cas. Au-delà, le gain est marginal et vous consommez du
        contexte inutilement.
      </p>

      <h2 id="sortie-structuree">Sortie structurée (JSON mode)</h2>
      <p>
        La plupart des modèles avancés supportent un mode JSON qui garantit
        une sortie parseable. C&apos;est essentiel pour les applications qui doivent
        traiter les réponses du modèle programmatiquement.
      </p>
      <p>
        Sans mode JSON, même en demandant &quot;Réponds en JSON&quot;, le modèle peut
        ajouter du texte avant ou après, ou utiliser des guillemets différents.
        Avec le mode JSON activé via l&apos;API, la sortie est toujours valide.
      </p>
      <p>
        Pour aller plus loin, certains modèles supportent la contrainte de
        schéma JSON (Structured Outputs chez OpenAI, ou via des outils comme
        Instructor ou Outlines). Vous définissez le schéma exact attendu et le
        modèle ne peut dévier.
      </p>
      <p>
        <strong>Exemple de prompt pour JSON</strong> : &quot;Extrais les informations
        suivantes du texte et retourne-les en JSON avec les clés : name, email,
        company, role. Texte : [votre texte]&quot;.
      </p>

      <h2 id="combiner-les-techniques">Combiner les techniques</h2>
      <p>
        Ces techniques ne sont pas exclusives — elles se combinent. Un prompt
        expert peut utiliser simultanément :
      </p>
      <p>
        - Un <strong>rôle</strong> (&quot;Tu es un analyste financier senior.&quot;)<br />
        - Du <strong>contexte</strong> (les données à analyser)<br />
        - Des <strong>exemples</strong> (2-3 analyses similaires)<br />
        - Une instruction <strong>chain-of-thought</strong> (&quot;Raisonne étape par étape&quot;)<br />
        - Une <strong>contrainte de format</strong> (tableau markdown ou JSON)
      </p>
      <p>
        Le risque est de surcharger le prompt et de noyer les instructions
        importantes. Commencez simple, mesurez le résultat, puis ajoutez une
        technique à la fois jusqu&apos;à obtenir le comportement souhaité.
      </p>
      <p>
        La discipline la plus utile en prompt engineering : documenter vos
        prompts qui fonctionnent. Un prompt efficace est un actif réutilisable.
      </p>
    </div>
  );
}

function EnContent() {
  return (
    <div className="prose">
      <h2 id="chain-of-thought">Chain-of-thought prompting</h2>
      <p>
        <strong>Chain-of-thought</strong> is a technique that involves asking
        the model to break down its reasoning step by step before giving the
        final answer. The effect is striking on complex tasks: errors decrease
        significantly because the model &quot;thinks out loud&quot; instead of
        short-circuiting to an intuitive response.
      </p>
      <p>
        <strong>How to activate it</strong>: simply add &quot;Reason step by step
        before answering.&quot; or &quot;Let&apos;s think through this methodically: ...&quot; to
        your prompt.
      </p>
      <p>
        <strong>Ideal use cases</strong>: solving logic problems, debugging
        code, analyzing arguments, estimating costs, project planning.
      </p>
      <p>
        <strong>When to avoid it</strong>: simple or factual tasks where
        chain-of-thought unnecessarily lengthens the response without adding
        value.
      </p>

      <h2 id="few-shot-learning">Few-shot learning</h2>
      <p>
        <strong>Few-shot learning</strong> involves providing a few
        input/output examples in the prompt to show the model exactly what you
        expect. It&apos;s one of the most effective techniques for controlling output
        format.
      </p>
      <p>
        <strong>Example</strong>:
      </p>
      <p>
        Classify the sentiment of the following sentences:<br />
        &quot;This product is excellent.&quot; → Positive<br />
        &quot;I&apos;m very disappointed.&quot; → Negative<br />
        &quot;It&apos;s fine, neither good nor bad.&quot; → Neutral<br />
        &quot;Never seen anything so effective!&quot; → ?
      </p>
      <p>
        The model immediately understands the expected format — a single label
        — and produces a consistent response. With zero-shot (no examples),
        responses vary more in format and verbosity.
      </p>
      <p>
        <strong>Rule of thumb</strong>: 2 to 5 examples are sufficient in most
        cases. Beyond that, the gain is marginal and you consume context
        unnecessarily.
      </p>

      <h2 id="sortie-structuree">Structured output (JSON mode)</h2>
      <p>
        Most advanced models support a JSON mode that guarantees parseable
        output. This is essential for applications that need to process model
        responses programmatically.
      </p>
      <p>
        Without JSON mode, even asking &quot;Reply in JSON&quot; can result in the model
        adding text before or after, or using different quote styles. With JSON
        mode activated via the API, the output is always valid.
      </p>
      <p>
        Going further, some models support JSON schema constraints (Structured
        Outputs at OpenAI, or via tools like Instructor or Outlines). You define
        the exact expected schema and the model cannot deviate.
      </p>
      <p>
        <strong>Example prompt for JSON</strong>: &quot;Extract the following
        information from the text and return it as JSON with keys: name, email,
        company, role. Text: [your text]&quot;.
      </p>

      <h2 id="combiner-les-techniques">Combining techniques</h2>
      <p>
        These techniques are not exclusive — they combine. An expert prompt can
        simultaneously use:
      </p>
      <p>
        - A <strong>role</strong> (&quot;You are a senior financial analyst.&quot;)<br />
        - <strong>Context</strong> (the data to analyze)<br />
        - <strong>Examples</strong> (2-3 similar analyses)<br />
        - A <strong>chain-of-thought instruction</strong> (&quot;Reason step by step&quot;)<br />
        - A <strong>format constraint</strong> (markdown table or JSON)
      </p>
      <p>
        The risk is overloading the prompt and drowning out important
        instructions. Start simple, measure the result, then add one technique
        at a time until you get the desired behavior.
      </p>
      <p>
        The most useful discipline in prompt engineering: document your prompts
        that work. An effective prompt is a reusable asset.
      </p>
    </div>
  );
}
