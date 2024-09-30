"use client";

import { useState, ChangeEvent } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Button } from "@/components/ui/button";

export default function GeneratePassword() {
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");

  const handleLengthChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLength(Number(e.target.value));
  };

  const generatePassword = (): void => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";
    let allChars = "";

    if (includeUppercase) allChars += uppercaseChars;
    if (includeLowercase) allChars += lowercaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSymbols) allChars += symbolChars;

    if (allChars === "") {
      alert("Please select at least one character type.");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      generatedPassword += allChars[randomIndex];
    }
    setPassword(generatedPassword);
  };

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(password).then(
      () => alert("Password copied to clipboard!"),
      () => alert("Failed to copy password.")
    );
  };

  const handleCheckboxChange =
    (setter: (value: boolean) => void) =>
    (checked: CheckedState): void => {
      if (typeof checked === "boolean") {
        setter(checked);
      }
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <Card className="w-full max-w-md p-6 bg-white shadow-xl rounded-xl">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-teal-600">Password Generator</h1>
            <p className="text-gray-700">Create a secure password in just a few clicks.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="length" className="text-gray-700">Password Length</Label>
              <Input
                id="length"
                type="number"
                min="8"
                max="32"
                value={length}
                onChange={handleLengthChange}
                className="w-full border border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-200 rounded-md"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700">Include:</Label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <Checkbox
                    id="uppercase"
                    checked={includeUppercase}
                    onCheckedChange={handleCheckboxChange(setIncludeUppercase)}
                  />
                  <Label htmlFor="uppercase" className="ml-2 text-gray-600">Uppercase Letters</Label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="lowercase"
                    checked={includeLowercase}
                    onCheckedChange={handleCheckboxChange(setIncludeLowercase)}
                  />
                  <Label htmlFor="lowercase" className="ml-2 text-gray-600">Lowercase Letters</Label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="numbers"
                    checked={includeNumbers}
                    onCheckedChange={handleCheckboxChange(setIncludeNumbers)}
                  />
                  <Label htmlFor="numbers" className="ml-2 text-gray-600">Numbers</Label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="symbols"
                    checked={includeSymbols}
                    onCheckedChange={handleCheckboxChange(setIncludeSymbols)}
                  />
                  <Label htmlFor="symbols" className="ml-2 text-gray-600">Symbols</Label>
                </div>
              </div>
            </div>
            <Button type="button" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow-md transition duration-200" onClick={generatePassword}>
              Generate Password
            </Button>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Generated Password</Label>
              <div className="flex items-center">
                <Input
                  id="password"
                  type="text"
                  value={password}
                  readOnly
                  placeholder="Your generated password will appear here"
                  className="flex-1 border border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-200 rounded-md"
                />
                <Button 
                  type="button" 
                  onClick={copyToClipboard} 
                  className="ml-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-md transition duration-200">
                  Copy
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

