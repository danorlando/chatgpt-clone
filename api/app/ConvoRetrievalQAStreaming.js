const { ChatOpenAI } = require('langchain/chat_models/openai');
const ConversationalRetrievalQAChain = require('langchain/chains').ConversationalRetrievalQAChain;
const HNSWLib = require('langchain/vectorstores/hnswlib').HNSWLib;
const OpenAIEmbeddings = require('langchain/embeddings/openai').OpenAIEmbeddings;
const RecursiveCharacterTextSplitter =
  require('langchain/text_splitter').RecursiveCharacterTextSplitter;
const BufferMemory = require('langchain/memory').BufferMemory;

const fs = require('fs');

const ConvoRetrievalQAStreaming = async (filePath) => {
  const text = fs.readFileSync(filePath, 'utf8');
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([text]);
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
  let streamedResponse = '';
  const streamingModel = new ChatOpenAI({
    streaming: true,
    callbacks: [
      {
        handleLLMNewToken(token) {
          streamedResponse += token;
        },
      },
    ],
  });
  const nonStreamingModel = new ChatOpenAI({});
  const chain = ConversationalRetrievalQAChain.fromLLM(streamingModel, vectorStore.asRetriever(), {
    returnSourceDocuments: true,
    memory: new BufferMemory({
      memoryKey: 'chat_history',
      inputKey: 'question', // The key for the input to the chain
      outputKey: 'text', // The key for the final conversational output of the chain
      returnMessages: true, // If using with a chat model
    }),
    questionGeneratorChainOptions: {
      llm: nonStreamingModel,
    },
  });
  /* Ask it a question */
  const question = 'What did the president say about Justice Breyer?';
  const res = await chain.call({ question });
  console.log({ streamedResponse });
  console.log(res);
};

module.exports = { ConvoRetrievalQAStreaming };
