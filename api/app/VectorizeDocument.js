const { ChatOpenAI } = require('langchain/chat_models/openai');
const ConversationalRetrievalQAChain = require('langchain/chains').ConversationalRetrievalQAChain;
const HNSWLib = require('langchain/vectorstores/hnswlib').HNSWLib;
const OpenAIEmbeddings = require('langchain/embeddings/openai').OpenAIEmbeddings;
const RecursiveCharacterTextSplitter =
  require('langchain/text_splitter').RecursiveCharacterTextSplitter;
const BufferMemory = require('langchain/memory').BufferMemory;
const fs = require('fs');

const VectorizeDocument = async (filePath) => {
  /* Initialize the LLM to use to answer the question */
  const model = new ChatOpenAI({});
  /* Load in the file we want to do question answering over */
  // const filePath = path.join(__dirname, 'state_of_the_union.txt');
  const text = fs.readFileSync(filePath, 'utf8');
  /* Split the text into chunks */
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([text]);
  /* Create the vectorstore */
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
  /* Create the chain */
  const chain = ConversationalRetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
    memory: new BufferMemory({
      memoryKey: 'chat_history', // Must be set to "chat_history"
    }),
  });
  /* Ask it a question */
  const question = 'What did the president say about Justice Breyer?';
  const res = await chain.call({ question });
  console.log(res);
  /* Ask it a follow up question */
  const followUpRes = await chain.call({
    question: 'Was that nice?',
  });
  console.log(followUpRes);
};

module.exports = { VectorizeDocument };
