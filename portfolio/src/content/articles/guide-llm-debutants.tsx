import type { Locale } from "@/types";

export default function GuideContent({ locale }: { locale: Locale }) {
  if (locale === "en") return <EnContent />;
  return <FrContent />;
}

function FrContent() {
  return (
    <div className="prose">
      <h2 id="quest-ce-quun-llm">Qu&apos;est-ce qu&apos;un LLM ?</h2>
      <p>
        Un <strong>Large Language Model</strong> (grand modèle de langage) est un
        réseau de neurones entraîné sur des quantités massives de texte pour
        prédire le mot suivant dans une séquence. Cette tâche en apparence
        simple cache une capacité remarquable : en apprenant à prédire du texte,
        le modèle développe une représentation interne du langage, des faits et
        du raisonnement.
      </p>
      <p>
        GPT-4, Claude, Gemini ou Mistral sont tous des LLM. Ils ne &quot;comprennent&quot;
        pas au sens humain du terme, mais ils génèrent du texte statistiquement
        cohérent avec un contexte donné — et ce contexte, c&apos;est votre prompt.
      </p>
      <p>
        <strong>Ce qu&apos;un LLM fait bien</strong> : résumer, traduire, reformuler,
        générer du code, expliquer des concepts, répondre à des questions
        factuelles courantes, adapter un ton ou un style.
      </p>
      <p>
        <strong>Ce qu&apos;il fait mal</strong> : les calculs arithmétiques complexes,
        les événements très récents (au-delà de sa date de coupure), raisonner
        de manière fiable sur des problèmes nécessitant une mémoire de travail
        longue, et distinguer la vérité de la plausibilité.
      </p>

      <h2 id="bien-formuler-ses-prompts">Bien formuler ses prompts</h2>
      <p>
        La qualité de la réponse dépend directement de la qualité de la question.
        Voici les quatre leviers les plus efficaces :
      </p>
      <p>
        <strong>1. Donner du contexte.</strong> Ne dites pas &quot;Explique-moi
        Docker&quot;. Dites &quot;Explique-moi Docker comme si j&apos;étais développeur
        web junior, je comprends les bases de Linux mais je n&apos;ai jamais fait de
        conteneurisation.&quot; Le contexte guide le niveau de réponse.
      </p>
      <p>
        <strong>2. Préciser le format attendu.</strong> &quot;Réponds en 3 points
        maximum&quot;, &quot;génère un tableau comparatif&quot;, &quot;écris un exemple de
        code en Python&quot;. Les LLM respectent bien les contraintes de format
        explicites.
      </p>
      <p>
        <strong>3. Assigner un rôle.</strong> &quot;Tu es un expert en sécurité
        réseau.&quot; ou &quot;Agis comme un relecteur exigeant.&quot; Cette instruction
        ajuste le registre et la profondeur de la réponse.
      </p>
      <p>
        <strong>4. Montrer un exemple.</strong> Si vous voulez un certain style
        ou format, donnez-en un exemple. &quot;Voici un exemple de ce que j&apos;attends :
        [exemple]. Maintenant fais la même chose pour [votre cas].&quot;
      </p>

      <h2 id="erreurs-classiques">Erreurs classiques à éviter</h2>
      <p>
        <strong>Faire confiance aux chiffres sans vérifier.</strong> Les LLM
        génèrent des statistiques, des dates et des citations qui &quot;sonnent
        vrai&quot; mais peuvent être entièrement inventées. Toujours vérifier les
        données factuelles importantes dans une source primaire.
      </p>
      <p>
        <strong>Penser que plus long = meilleure réponse.</strong> Un prompt
        exhaustif n&apos;est pas toujours meilleur. Parfois, une question courte et
        précise produit une réponse plus utile qu&apos;un prompt de 500 mots.
      </p>
      <p>
        <strong>Ne pas itérer.</strong> Le premier échange est rarement le
        meilleur. Demandez des clarifications, demandez d&apos;approfondir un point
        spécifique, reformulez si la réponse ne convient pas. Le dialogue est
        le vrai avantage des LLM conversationnels.
      </p>
      <p>
        <strong>Oublier que le contexte s&apos;accumule.</strong> Dans une longue
        conversation, le modèle peut &quot;oublier&quot; les instructions données au début.
        Pour les tâches importantes, rappelez les contraintes clés à intervalles
        réguliers ou commencez une nouvelle conversation.
      </p>

      <h2 id="pour-aller-plus-loin">Pour aller plus loin</h2>
      <p>
        Si vous voulez approfondir, consultez le guide PDF associé à cet article —
        il couvre les cas d&apos;usage avancés, les limites des modèles actuels et une
        sélection d&apos;outils pratiques organisés par cas d&apos;usage.
      </p>
      <p>
        L&apos;article suivant sur le{" "}
        <a href="/fr/blog/prompt-engineering-avance">prompt engineering avancé</a>{" "}
        va plus loin avec des techniques comme le chain-of-thought et le
        few-shot learning.
      </p>
    </div>
  );
}

function EnContent() {
  return (
    <div className="prose">
      <h2 id="quest-ce-quun-llm">What is an LLM?</h2>
      <p>
        A <strong>Large Language Model</strong> is a neural network trained on
        massive amounts of text to predict the next word in a sequence. This
        seemingly simple task hides a remarkable capability: by learning to
        predict text, the model develops an internal representation of language,
        facts, and reasoning.
      </p>
      <p>
        GPT-4, Claude, Gemini, and Mistral are all LLMs. They don&apos;t
        &quot;understand&quot; in the human sense, but they generate text that is
        statistically coherent with a given context — and that context is your
        prompt.
      </p>
      <p>
        <strong>What an LLM does well</strong>: summarizing, translating,
        reformulating, generating code, explaining concepts, answering common
        factual questions, and adapting tone or style.
      </p>
      <p>
        <strong>What it does poorly</strong>: complex arithmetic, very recent
        events (beyond its training cutoff), reliable reasoning over long
        working memory, and distinguishing truth from plausibility.
      </p>

      <h2 id="bien-formuler-ses-prompts">Writing effective prompts</h2>
      <p>
        The quality of the answer depends directly on the quality of the
        question. Here are the four most effective levers:
      </p>
      <p>
        <strong>1. Provide context.</strong> Don&apos;t say &quot;Explain Docker to me.&quot;
        Say &quot;Explain Docker as if I were a junior web developer who understands
        Linux basics but has never done containerization.&quot; Context guides the
        level of the response.
      </p>
      <p>
        <strong>2. Specify the expected format.</strong> &quot;Answer in 3 points
        max&quot;, &quot;generate a comparison table&quot;, &quot;write a Python code example.&quot;
        LLMs respect explicit format constraints well.
      </p>
      <p>
        <strong>3. Assign a role.</strong> &quot;You are a network security expert.&quot;
        or &quot;Act as a demanding editor.&quot; This instruction adjusts the register
        and depth of the response.
      </p>
      <p>
        <strong>4. Show an example.</strong> If you want a certain style or
        format, provide an example. &quot;Here is an example of what I expect:
        [example]. Now do the same for [your case].&quot;
      </p>

      <h2 id="erreurs-classiques">Common mistakes to avoid</h2>
      <p>
        <strong>Trusting numbers without verifying.</strong> LLMs generate
        statistics, dates, and citations that &quot;sound true&quot; but may be entirely
        fabricated. Always verify important factual data in a primary source.
      </p>
      <p>
        <strong>Thinking longer = better response.</strong> An exhaustive prompt
        isn&apos;t always better. Sometimes a short, precise question produces a more
        useful response than a 500-word prompt.
      </p>
      <p>
        <strong>Not iterating.</strong> The first exchange is rarely the best.
        Ask for clarifications, ask to expand on a specific point, rephrase if
        the response doesn&apos;t fit. Dialogue is the real advantage of
        conversational LLMs.
      </p>
      <p>
        <strong>Forgetting that context accumulates.</strong> In a long
        conversation, the model may &quot;forget&quot; instructions given at the start.
        For important tasks, remind it of key constraints at regular intervals
        or start a new conversation.
      </p>

      <h2 id="pour-aller-plus-loin">Going further</h2>
      <p>
        If you want to go deeper, check out the PDF guide linked to this article
        — it covers advanced use cases, the limits of current models, and a
        selection of practical tools organized by use case.
      </p>
      <p>
        The next article on{" "}
        <a href="/en/blog/prompt-engineering-avance">
          advanced prompt engineering
        </a>{" "}
        goes further with techniques like chain-of-thought and few-shot
        learning.
      </p>
    </div>
  );
}
