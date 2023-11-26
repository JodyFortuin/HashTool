import React from 'react';
import axios from 'axios';
import './App.css';
import './input.css';

import {NextUIProvider} from "@nextui-org/react";
import {Input, Card, CardHeader, CardBody, Image, Accordion, AccordionItem, Avatar} from "@nextui-org/react";
import {SearchIcon} from "./SearchIcon";
import { useState } from 'react';

interface HashTagResponseProps {
  data: {
    data: {
      count: number,
      items: {
        caption_hashtags: string,
        caption_text: string,
        comment_count: number,
        image_versions: {
          height: number,
          url: string,
        }[],
        like_count: number,
        user: {
          profile_pic_url: string,
          username: string,
        }
      }[],
    }
    pagination_token: string,
  }
  status: number,
  statusText: string,
}

const Test = (responseData : HashTagResponseProps) => (
  <>
    {responseData.data.data.items.map((item, i) => (
       <Card className="Display-Card py-4" key={i}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">{item.like_count} Likes</p>
              <h4 className="font-bold text-large">@{item.user.username}</h4>

            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover img-rounded"
                src={responseData.data.data.items[i].image_versions[0].url}
                width={270}
              />
              {/* <Accordion isCompact>
                <AccordionItem key="1" aria-label="Accordion 1" title="Caption">
                <small className="text-default-500">{item.caption_text}</small>
                </AccordionItem>
              </Accordion> */}
              {/* <Accordion isCompact>
                <AccordionItem key={item.user.username} aria-label={item.user.username} title="Post Hashtags">
                <small className="text-default-500">{item.caption_hashtags}</small>
                </AccordionItem>
              </Accordion> */}
            </CardBody>
          </Card>
    ))}
  </>
); 

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [returnData, setReturnData] = useState({
    data: {
      data: {
        count: 0,
        items: [{
          caption_hashtags: "",
          caption_text: "iufhsidhfshfds sdfsfsdinjsf",
          comment_count: 0,
          image_versions: [{
            height: 0,
            url: "",
          }],
          like_count: 0,
          user: {
            profile_pic_url: "",
            username: "",
          }
        }],
      },
      pagination_token: "",
    },
    status: 0,
    statusText: "",
  });

  async function handleSubmit(e: React.ChangeEvent<any>) {
    e.preventDefault();
  
    console.error("input", e.target.input.value)
    console.error("newinput", inputValue)
    console.error(e)
    const options = {
      method: 'GET',
      url: 'https://instagram-scraper-api2.p.rapidapi.com/v1.1/hashtag',
      params: {hashtag: inputValue},
      headers: {
        'X-RapidAPI-Key': '216f9fd1d1msha2aacb301f5ad32p1a965cjsnc42ca3d6bb74',
        'X-RapidAPI-Host': 'instagram-scraper-api2.p.rapidapi.com',
      }
    };

    try {
      setIsLoading(true);
      const response = await axios.request(options);
      setIsLoading(false);
      setReturnData(response);
      console.log("log response", response);
      console.error("response", response)
    } catch (error) {
      console.error(error);
    }
  }
  // const arrayDataItems = courses.map((course) => <li>{}</li>);
  // {arrayDataItems.map(key => {
  return (
    <NextUIProvider>
      <form method="get" onSubmit={handleSubmit}>
      <div className="App">
        <header className="App-header">
          <h1>HashTool</h1>         
          <div className="Search-Card w-[340px] h-[240px] px-8 rounded-2xl flex justify-center items-center bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
      {(!isLoading) &&
      <Input
        label="Search"
        isRequired
        isClearable
        radius="lg"
        id="input"
        onChange={(event) =>
          setInputValue(event.target.value)
        }
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focused=true]:bg-default-200/50",
            "dark:group-data-[focused=true]:bg-default/60",
            "!cursor-text",
          ],
          }}
          placeholder="Type to search..."
        startContent={
          <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
        />
      }
      {(isLoading) &&
        <img className="loadingIcon" src="loading.png"></img>
      }
          </div>

        {/* <h1>Number of posts displayed: {returnData.data.data.count}</h1> */}
        
        <div className="grid gap-10 grid-cols-3 grid-rows-3">
          {(returnData.data.data.count !== 0) &&
            <Test {...returnData} />
          }
        </div>
         
        </header>
      </div>
      </form>
    </NextUIProvider>
  );
  // })}
}

export default App;
